// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RevenueSplit
 * @dev Handles automatic split of payments between platform and creator
 */
contract RevenueSplit {
    address public platformWallet;
    uint256 public platformFeeBps; // fee in basis points (100 = 1%)
    uint256 public constant MAX_BPS = 10000; // 100%

    event PlatformFeeUpdated(uint256 oldFee, uint256 newFee);
    event PlatformWalletUpdated(address oldWallet, address newWallet);
    event RevenueDistributed(address indexed creator, uint256 creatorAmount, uint256 platformAmount);

    constructor(address _platformWallet, uint256 _platformFeeBps) {
        require(_platformWallet != address(0), "Invalid platform wallet");
        require(_platformFeeBps <= MAX_BPS, "Fee too high");
        platformWallet = _platformWallet;
        platformFeeBps = _platformFeeBps;
    }

    function updatePlatformFee(uint256 _newFeeBps) external {
        // For MVP: platform-controlled only; you may add Ownable
        require(_newFeeBps <= MAX_BPS, "Fee too high");
        emit PlatformFeeUpdated(platformFeeBps, _newFeeBps);
        platformFeeBps = _newFeeBps;
    }

    function updatePlatformWallet(address _newWallet) external {
        require(_newWallet != address(0), "Invalid wallet");
        emit PlatformWalletUpdated(platformWallet, _newWallet);
        platformWallet = _newWallet;
    }

    /**
     * @dev Splits payment between platform and creator
     * @param token ERC20 token contract
     * @param payer Address paying the funds
     * @param creator Creator address to receive split
     * @param amount Total amount to split
     */
    function distribute(
        IERC20 token,
        address payer,
        address creator,
        uint256 amount
    ) external {
        require(amount > 0, "No funds to split");

        uint256 platformAmount = (amount * platformFeeBps) / MAX_BPS;
        uint256 creatorAmount = amount - platformAmount;

        require(token.transferFrom(payer, platformWallet, platformAmount), "Platform transfer failed");
        require(token.transferFrom(payer, creator, creatorAmount), "Creator transfer failed");

        emit RevenueDistributed(creator, creatorAmount, platformAmount);
    }
}

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}
