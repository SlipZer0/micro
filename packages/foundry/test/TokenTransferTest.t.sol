// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "/home/zhijian/micropayment/packages/foundry/contracts/TokenTransfer.sol";
import "lib/solidity-bytes-utils/lib/forge-std/src/mocks/MockERC20.sol"; 

contract TokenTransferTest is Test {
    TokenTransfer tt;
    MockERC20 token;
    address owner = address(this);

    function setUp() public {
        tt = new TokenTransfer();
        token = new MockERC20();
        token.transfer(address(tt), 100e18);
    }

    function testSendToken() public {
        tt.sendToken(address(token), address(0x123), 10e18);
        assertEq(token.balanceOf(address(0x123)), 10e18);
    }

    function testWithdrawETH() public {
        // Fund the contract
        payable(address(tt)).transfer(1 ether);
        uint256 balBefore = owner.balance;
        tt.withdrawETH(payable(owner));
        assertEq(owner.balance, balBefore + 1 ether);
    }
}
