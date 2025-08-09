// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/**
 * @title MockUSDC
 * @notice Simple ERC20 token with 6 decimals to mimic USDC for local/dev testing.
 *         Owner can mint arbitrary amounts. Also provides a small public faucet for convenience.
 *
 * WARNING: This token is purely for tests/hackathons — do NOT deploy to production networks.
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockUSDC is ERC20, Ownable {
    uint8 private constant USDC_DECIMALS = 6;

    // public faucet cap per call (6-decimals)
    uint256 public faucetAmount = 1_000_000 * (10 ** USDC_DECIMALS); // default 1,000,000 units (i.e., 1,000,000 * 10^6)

    event FaucetMint(address indexed to, uint256 amount);
    event OwnerMint(address indexed to, uint256 amount);
    event FaucetAmountUpdated(uint256 previous, uint256 next);

    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) Ownable(msg.sender) {
        // nothing else
    }

    /// override decimals to 6
    function decimals() public pure override returns (uint8) {
        return USDC_DECIMALS;
    }

    /// Owner mint
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit OwnerMint(to, amount);
    }

    /// Simple public faucet (convenience for dev only)
    function faucet() external {
        _mint(msg.sender, faucetAmount);
        emit FaucetMint(msg.sender, faucetAmount);
    }

    /// Owner can set faucet amount
    function setFaucetAmount(uint256 newAmount) external onlyOwner {
        uint256 previous = faucetAmount;
        faucetAmount = newAmount;
        emit FaucetAmountUpdated(previous, newAmount);
    }
}
