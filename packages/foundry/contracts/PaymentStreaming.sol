// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ICourseRegistry {
    function getRateAndCreator(uint256 courseId) external view returns (uint256 ratePerSecond, address creator);
}

interface IRevenueSplit {
    function distributeRevenue(address creator, uint256 amount) external;
}

contract PaymentStreaming is Ownable {
    IERC20 public immutable usdc;
    ICourseRegistry public immutable courseRegistry;
    IRevenueSplit public immutable revenueSplit;

    struct Stream {
        address learner;
        address creator;
        uint256 ratePerSecond;
        uint256 startTime;
        uint256 lastClaimed;
        uint256 totalPaid;
        bool active;
    }

    // courseId => learner => Stream
    mapping(uint256 => mapping(address => Stream)) public streams;

    event StreamStarted(uint256 indexed courseId, address indexed learner, address indexed creator, uint256 ratePerSecond);
    event StreamStopped(uint256 indexed courseId, address indexed learner, uint256 totalPaid);
    event PaymentClaimed(uint256 indexed courseId, address indexed learner, address indexed creator, uint256 amount);

    constructor(
        address _usdc,
        address _courseRegistry,
        address _revenueSplit
    ) Ownable(msg.sender) {
        require(_usdc != address(0), "Invalid USDC address");
        require(_courseRegistry != address(0), "Invalid CourseRegistry address");
        require(_revenueSplit != address(0), "Invalid RevenueSplit address");

        usdc = IERC20(_usdc);
        courseRegistry = ICourseRegistry(_courseRegistry);
        revenueSplit = IRevenueSplit(_revenueSplit);
    }

    /**
     * @notice Start a streaming payment session for a course
     * @dev Fetches rate and creator from CourseRegistry
     */
    function startStream(uint256 courseId) external {
        require(!streams[courseId][msg.sender].active, "Stream already active");

        (uint256 ratePerSecond, address creator) = courseRegistry.getRateAndCreator(courseId);
        require(ratePerSecond > 0, "Invalid rate");
        require(creator != address(0), "Invalid creator address");

        streams[courseId][msg.sender] = Stream({
            learner: msg.sender,
            creator: creator,
            ratePerSecond: ratePerSecond,
            startTime: block.timestamp,
            lastClaimed: block.timestamp,
            totalPaid: 0,
            active: true
        });

        emit StreamStarted(courseId, msg.sender, creator, ratePerSecond);
    }

    /**
     * @notice Stop a streaming session and finalize payment
     */
    function stopStream(uint256 courseId) external {
        Stream storage s = streams[courseId][msg.sender];
        require(s.active, "No active stream");

        _claimPayment(courseId, msg.sender);

        s.active = false;

        emit StreamStopped(courseId, msg.sender, s.totalPaid);
    }

    /**
     * @notice Claim payment for elapsed time since last claim
     */
    function claimPayment(uint256 courseId, address learner) external {
        _claimPayment(courseId, learner);
    }

    function _claimPayment(uint256 courseId, address learner) internal {
        Stream storage s = streams[courseId][learner];
        require(s.active, "Stream not active");
        require(msg.sender == s.creator || msg.sender == owner(), "Not authorized");

        uint256 elapsed = block.timestamp - s.lastClaimed;
        if (elapsed == 0) return;

        uint256 amount = elapsed * s.ratePerSecond;

        // Transfer USDC from learner to this contract first
        require(usdc.transferFrom(s.learner, address(this), amount), "USDC pull failed");

        // Approve and forward the revenue to RevenueSplit for distribution
        require(usdc.approve(address(revenueSplit), amount), "USDC approve failed");
        revenueSplit.distributeRevenue(s.creator, amount);

        s.totalPaid += amount;
        s.lastClaimed = block.timestamp;

        emit PaymentClaimed(courseId, learner, s.creator, amount);
    }

    /**
     * @notice View how much is owed so far
     */
    function pendingPayment(uint256 courseId, address learner) external view returns (uint256) {
        Stream storage s = streams[courseId][learner];
        if (!s.active) return 0;

        uint256 elapsed = block.timestamp - s.lastClaimed;
        return elapsed * s.ratePerSecond;
    }
}
