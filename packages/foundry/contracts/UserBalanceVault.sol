// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/**
 * @title UserBalanceVault
 * @notice Hold user deposits of an ERC20 token (e.g., USDC). Authorized callers (PaymentStreaming)
 *         can deduct user balances and forward tokens to a recipient atomically.
 *
 * Security notes:
 *  - Learners must approve this vault to pull tokens on deposit.
 *  - Only authorized contracts (set by owner) can call `deductAndForward`.
 *  - Uses SafeERC20 to handle non-compliant ERC20s safely.
 */

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract UserBalanceVault is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable token; // e.g., USDC

    // user => balance (in token's smallest unit)
    mapping(address => uint256) private balances;

    // authorized contract (PaymentStreaming) addresses that can deduct
    mapping(address => bool) public authorized;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event DeductedAndForwarded(address indexed payer, address indexed to, uint256 amount, address indexed operator);
    event AuthorizedSet(address indexed operator, bool allowed);

    constructor(address _token) Ownable(msg.sender) {
        require(_token != address(0), "Invalid token");
        token = IERC20(_token);
    }

    /**
     * @notice Deposit tokens into vault (pulls from msg.sender). Caller must approve vault first.
     * @param amount Amount to deposit.
     */
    function deposit(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount>0");
        balances[msg.sender] += amount;
        token.safeTransferFrom(msg.sender, address(this), amount);
        emit Deposited(msg.sender, amount);
    }

    /**
     * @notice Withdraw user's token balance from vault back to their wallet.
     * @param amount Amount to withdraw (must be <= balance).
     */
    function withdraw(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount>0");
        uint256 bal = balances[msg.sender];
        require(bal >= amount, "Insufficient vault balance");
        balances[msg.sender] = bal - amount;
        token.safeTransfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    /**
     * @notice Authorized operator deducts from `payer`'s vault balance and forwards tokens to `to`.
     * @dev Only addresses set as authorized by owner can call this.
     *      Usecase: PaymentStreaming calls this to settle streaming segments.
     * @param payer The user whose vault balance will be deducted.
     * @param to Recipient address (e.g., RevenueSplit or creator).
     * @param amount Amount to deduct and forward.
     */
    function deductAndForward(address payer, address to, uint256 amount) external nonReentrant {
        require(authorized[msg.sender], "Not authorized");
        require(payer != address(0) && to != address(0), "Invalid address");
        require(amount > 0, "Amount>0");

        uint256 bal = balances[payer];
        require(bal >= amount, "Insufficient payer balance");

        // update internal ledger
        balances[payer] = bal - amount;

        // forward tokens
        token.safeTransfer(to, amount);

        emit DeductedAndForwarded(payer, to, amount, msg.sender);
    }

    /** Owner helpers **/

    /// @notice Set or unset an authorized operator (e.g., PaymentStreaming)
    function setAuthorized(address operator, bool allowed) external onlyOwner {
        authorized[operator] = allowed;
        emit AuthorizedSet(operator, allowed);
    }

    /// @notice Owner can rescue tokens accidentally sent to this contract (non-user funds).
    function rescueERC20(address _token, address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid to");
        IERC20(_token).safeTransfer(to, amount);
    }

    /** Views **/

    /// @notice Return vault balance for a user
    function balanceOf(address user) external view returns (uint256) {
        return balances[user];
    }
}
