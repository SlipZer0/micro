// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/**
 * @title PlatformAdmin
 * @notice Central place for platform-level configuration and simple role management.
 *         Designed to be lightweight — other contracts can reference this for treasury,
 *         platformFeeBps, and operator checks.
 *
 * Functions:
 *  - set/get platform treasury address
 *  - set/get global platformFee (basis points)
 *  - manage operator addresses
 *  - emergency pause flag
 */

import "@openzeppelin/contracts/access/Ownable.sol";

contract PlatformAdmin is Ownable {
    address public treasury;
    uint256 public platformFeeBps; // basis points, 10000 = 100%
    bool public paused;

    // operator => allowed
    mapping(address => bool) public operators;

    event TreasuryUpdated(address indexed previous, address indexed next);
    event PlatformFeeUpdated(uint256 previousBps, uint256 nextBps);
    event OperatorUpdated(address indexed operator, bool allowed);
    event PausedChanged(bool paused);

    constructor(address _treasury, uint256 _platformFeeBps) Ownable(msg.sender) {
        require(_treasury != address(0), "Invalid treasury");
        require(_platformFeeBps <= 10000, "Fee too high");
        treasury = _treasury;
        platformFeeBps = _platformFeeBps;
        paused = false;
    }

    /** Owner-only configuration **/

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Invalid treasury");
        address previous = treasury;
        treasury = _treasury;
        emit TreasuryUpdated(previous, _treasury);
    }

    function setPlatformFeeBps(uint256 _bps) external onlyOwner {
        require(_bps <= 10000, "Fee too high");
        uint256 previous = platformFeeBps;
        platformFeeBps = _bps;
        emit PlatformFeeUpdated(previous, _bps);
    }

    function setOperator(address operator, bool allowed) external onlyOwner {
        operators[operator] = allowed;
        emit OperatorUpdated(operator, allowed);
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
        emit PausedChanged(_paused);
    }

    /** Modifiers helpers for other contracts **/

    /// @notice simple getter used by other contracts
    function isOperator(address who) external view returns (bool) {
        return operators[who];
    }
}
