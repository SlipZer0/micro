// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address owner) external view returns (uint256);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract TokenTransfer {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Send ERC-20 tokens from this contract to a recipient
    function sendToken(address token, address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner");
        require(IERC20(token).transfer(to, amount), "Transfer failed");
    }

    // Withdraw all ETH from this contract
    function withdrawETH(address payable to) external {
        require(msg.sender == owner, "Only owner");
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        to.transfer(balance);
    }

    // Fallback to receive ETH
    receive() external payable {}
}
