// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PaymentStreaming
 * @notice Handles pay-per-second micropayments from learners to creators in USDC.
 * @dev Designed for FlowLearn — per-second billing for online course consumption.
 */

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentStreaming is Ownable {
    /// @notice ERC20 stablecoin used for streaming (e.g., USDC)
    IERC20 public paymentToken;

    /// @notice Platform fee in basis points (e.g., 500 = 5%)
    uint256 public platformFeeBps;

    /// @notice Address where platform fees are sent
    address public treasury;

    /// @notice Unique stream ID counter
    uint256 private _streamCounter;

    /// @notice Struct to store streaming session data
    struct Stream {
        address learner;
        address creator;
        uint256 ratePerSecond; // in token's smallest unit
        uint256 startTime;     // last resume/start timestamp
        uint256 totalAccrued;  // total owed (before fees)
        bool active;
    }

    /// @notice Mapping of streamId => Stream details
    mapping(uint256 => Stream) public streams;

    /// @notice Mapping of creator => balance owed (after fees)
    mapping(address => uint256) public creatorBalances;

    /// @notice Emitted when a stream is started
    event StreamStarted(uint256 indexed streamId, address indexed learner, address indexed creator, uint256 ratePerSecond);

    /// @notice Emitted when a stream is paused
    event StreamPaused(uint256 indexed streamId, uint256 accruedAmount);

    /// @notice Emitted when a stream is resumed
    event StreamResumed(uint256 indexed streamId);

    /// @notice Emitted when a stream is stopped
    event StreamStopped(uint256 indexed streamId, uint256 finalAmount);

    /// @notice Emitted when a creator withdraws earnings
    event Withdraw(address indexed creator, uint256 amount);

    constructor(address _paymentToken, address _treasury, uint256 _platformFeeBps) Ownable(msg.sender) {
        require(_paymentToken != address(0), "Invalid token address");
        require(_treasury != address(0), "Invalid treasury address");
        require(_platformFeeBps <= 10000, "Fee too high");

        paymentToken = IERC20(_paymentToken);
        treasury = _treasury;
        platformFeeBps = _platformFeeBps;
    }

    // ----------------------------
    //    STREAM MANAGEMENT
    // ----------------------------

    /**
     * @notice Start a new payment stream
     * @param _creator Address of the content creator
     * @param _ratePerSecond Payment rate in smallest token unit (e.g., 1000 = 0.001 USDC)
     * @return streamId Unique ID for the created stream
     */
    function startStream(address _creator, uint256 _ratePerSecond) external returns (uint256 streamId) {
        require(_creator != address(0), "Invalid creator");
        require(_ratePerSecond > 0, "Invalid rate");

        _streamCounter++;
        streamId = _streamCounter;

        streams[streamId] = Stream({
            learner: msg.sender,
            creator: _creator,
            ratePerSecond: _ratePerSecond,
            startTime: block.timestamp,
            totalAccrued: 0,
            active: true
        });

        emit StreamStarted(streamId, msg.sender, _creator, _ratePerSecond);
    }

    /**
     * @notice Pause an active stream and update accrued amount
     */
    function pauseStream(uint256 _streamId) external {
        Stream storage s = streams[_streamId];
        require(msg.sender == s.learner || msg.sender == owner(), "Not authorized");
        require(s.active, "Stream already paused/stopped");

        uint256 elapsed = block.timestamp - s.startTime;
        uint256 amount = elapsed * s.ratePerSecond;

        s.totalAccrued += amount;
        s.active = false;

        emit StreamPaused(_streamId, amount);
    }

    /**
     * @notice Resume a paused stream
     */
    function resumeStream(uint256 _streamId) external {
        Stream storage s = streams[_streamId];
        require(msg.sender == s.learner, "Not learner");
        require(!s.active, "Already active");

        s.startTime = block.timestamp;
        s.active = true;

        emit StreamResumed(_streamId);
    }

    /**
     * @notice Stop a stream and settle payment to creator and platform
     */
    function stopStream(uint256 _streamId) external {
        Stream storage s = streams[_streamId];
        require(msg.sender == s.learner || msg.sender == owner(), "Not authorized");
        require(s.active, "Already stopped");

        uint256 elapsed = block.timestamp - s.startTime;
        uint256 amount = elapsed * s.ratePerSecond;

        s.totalAccrued += amount;
        s.active = false;

        // Settle payment
        _settlePayment(s.creator, s.totalAccrued);

        emit StreamStopped(_streamId, s.totalAccrued);
    }

    // ----------------------------
    //    PAYMENT & WITHDRAWAL
    // ----------------------------

    /**
     * @dev Internal function to handle payment settlement
     */
    function _settlePayment(address creator, uint256 totalAmount) internal {
        require(paymentToken.balanceOf(msg.sender) >= totalAmount, "Insufficient balance");

        // Pull payment from learner
        require(paymentToken.transferFrom(msg.sender, address(this), totalAmount), "Token transfer failed");

        // Calculate fees
        uint256 feeAmount = (totalAmount * platformFeeBps) / 10000;
        uint256 creatorAmount = totalAmount - feeAmount;

        // Update balances
        creatorBalances[creator] += creatorAmount;

        // Send fees to treasury
        require(paymentToken.transfer(treasury, feeAmount), "Fee transfer failed");
    }

    /**
     * @notice Withdraw available creator balance
     */
    function withdraw() external {
        uint256 amount = creatorBalances[msg.sender];
        require(amount > 0, "No balance");

        creatorBalances[msg.sender] = 0;
        require(paymentToken.transfer(msg.sender, amount), "Withdraw failed");

        emit Withdraw(msg.sender, amount);
    }

    // ----------------------------
    //    ADMIN FUNCTIONS
    // ----------------------------

    function setPlatformFee(uint256 _feeBps) external onlyOwner {
        require(_feeBps <= 10000, "Fee too high");
        platformFeeBps = _feeBps;
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Invalid address");
        treasury = _treasury;
    }
}
