// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RevenueSplit
 * @dev Handles splitting ERC20 payments between a creator and the platform.
 *      This version supports ERC20 tokens like USDC.
 */
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RevenueSplit is Ownable {
    IERC20 public immutable paymentToken; // e.g., USDC contract
    address public platformWallet; // Platform fee receiver
    uint256 public platformFeeBps; // Platform fee in basis points (100 bps = 1%)

    event PaymentSplit(
        address indexed payer,
        address indexed creator,
        uint256 creatorAmount,
        uint256 platformAmount
    );

    /**
     * @param _paymentToken ERC20 token address for payments (e.g., USDC)
     * @param _platformWallet Address where platform fees are sent
     * @param _platformFeeBps Platform fee in basis points (100 = 1%)
     */
    constructor(
        address _paymentToken,
        address _platformWallet,
        uint256 _platformFeeBps
    ) Ownable(msg.sender) {
        require(_paymentToken != address(0), "Invalid token");
        require(_platformWallet != address(0), "Invalid platform wallet");
        require(_platformFeeBps <= 10000, "Fee too high");

        paymentToken = IERC20(_paymentToken);
        platformWallet = _platformWallet;
        platformFeeBps = _platformFeeBps;
    }

    /**
     * @notice Splits a payment between the creator and the platform.
     * @param _creator Address of the course creator
     * @param _amount Total amount to split (in smallest token units)
     */
    function splitPayment(address _creator, uint256 _amount) external {
        require(_creator != address(0), "Invalid creator");
        require(_amount > 0, "Invalid amount");

        uint256 platformAmount = (_amount * platformFeeBps) / 10000;
        uint256 creatorAmount = _amount - platformAmount;

        // Pull tokens from payer
        require(
            paymentToken.transferFrom(msg.sender, _creator, creatorAmount),
            "Creator payment failed"
        );
        require(
            paymentToken.transferFrom(msg.sender, platformWallet, platformAmount),
            "Platform payment failed"
        );

        emit PaymentSplit(msg.sender, _creator, creatorAmount, platformAmount);
    }

    /**
     * @notice Updates the platform wallet address
     * @param _wallet New platform wallet address
     */
    function setPlatformWallet(address _wallet) external onlyOwner {
        require(_wallet != address(0), "Invalid wallet");
        platformWallet = _wallet;
    }

    /**
     * @notice Updates the platform fee in basis points
     * @param _bps New fee in basis points
     */
    function setPlatformFeeBps(uint256 _bps) external onlyOwner {
        require(_bps <= 10000, "Fee too high");
        platformFeeBps = _bps;
    }
}
