// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Script.sol";

import { MockUSDC } from "../contracts/MockUSDC.sol";
import { UserBalanceVault } from "../contracts/UserBalanceVault.sol";
import { PlatformAdmin } from "../contracts/PlatformAdmin.sol";
import { CourseRegistry } from "../contracts/CourseRegistry.sol";
import { RevenueSplit } from "../contracts/RevenueSplit.sol";
import { PaymentStreaming } from "../contracts/PaymentStreaming.sol";

contract DeployFlowLearn is Script {
    function run() external {
        // get deployer key from env
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        // Optional: change this fee or treasury before running
        uint256 platformFeeBps = 500; // 5%
        address platformTreasury = deployer; // default to deployer; change if needed

        vm.startBroadcast(deployerPrivateKey);

        ///////////////////////////
        // 1) Deploy MockUSDC
        ///////////////////////////
        MockUSDC mockUSDC = new MockUSDC("Mock USD Coin", "mUSDC");
        console.log("MockUSDC:", address(mockUSDC));

        ///////////////////////////
        // 2) Deploy UserBalanceVault
        ///////////////////////////
        UserBalanceVault vault = new UserBalanceVault(address(mockUSDC));
        console.log("UserBalanceVault:", address(vault));

        ///////////////////////////
        // 3) Deploy PlatformAdmin
        // constructor(address _treasury, uint256 _platformFeeBps)
        ///////////////////////////
        PlatformAdmin platformAdmin = new PlatformAdmin(platformTreasury, platformFeeBps);
        console.log("PlatformAdmin:", address(platformAdmin));

        ///////////////////////////
        // 4) Deploy CourseRegistry
        ///////////////////////////
        CourseRegistry courseRegistry = new CourseRegistry();
        console.log("CourseRegistry:", address(courseRegistry));

        ///////////////////////////
        // 5) Deploy RevenueSplit
        // constructor(address _paymentToken, address _platformWallet, uint256 _platformFeeBps)
        ///////////////////////////
        RevenueSplit revenueSplit = new RevenueSplit(address(mockUSDC), platformTreasury, platformFeeBps);
        console.log("RevenueSplit:", address(revenueSplit));

        ///////////////////////////
        // 6) Deploy PaymentStreaming
        // constructor(address _usdc, address _courseRegistry, address _revenueSplit)
        ///////////////////////////
        PaymentStreaming paymentStreaming = new PaymentStreaming(
            address(mockUSDC),
            address(courseRegistry),
            address(revenueSplit)
        );
        console.log("PaymentStreaming:", address(paymentStreaming));

        ///////////////////////////
        // Post-deploy wiring
        ///////////////////////////

        // Authorize paymentStreaming in vault so it can deduct balances
        vault.setAuthorized(address(paymentStreaming), true);
        console.log("Authorized PaymentStreaming on Vault");

        // Mint some MockUSDC to deployer for testing (1,000,000 units with mock's decimals)
        uint8 decimals = mockUSDC.decimals(); // MockUSDC.decimals() is public
        uint256 amount = 1_000_000 * (10 ** uint256(decimals));
        mockUSDC.mint(deployer, amount);
        console.log("Minted MockUSDC to deployer:", deployer);

        vm.stopBroadcast();
    }
}
