"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

type Address = string;

export const TokenTransferUI = () => {
  const [tokenAddress, setTokenAddress] = useState<Address>("" as Address);
  const [recipientAddress, setRecipientAddress] = useState<Address>("" as Address);
  const [amount, setAmount] = useState<string>("");
  const [withdrawAddress, setWithdrawAddress] = useState<Address>("" as Address);

  // Hook for contract interaction
  const { writeContractAsync } = useScaffoldWriteContract("TokenTransfer");

  const handleSendToken = async () => {
    try {
      await writeContractAsync({
        functionName: "sendToken",
        args: [tokenAddress, recipientAddress, BigInt(amount)], // amount in wei
      });
      alert("Token sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Error sending token");
    }
  };

  const handleWithdrawETH = async () => {
    try {
      await writeContractAsync({
        functionName: "withdrawETH",
        args: [withdrawAddress],
      });
      alert("ETH withdrawn successfully!");
    } catch (err) {
      console.error(err);
      alert("Error withdrawing ETH");
    }
  };

  return (
    <>
      <ConnectButton />
      <div className="p-6 bg-base-200 rounded-xl max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-bold">Token Transfer</h2>

        <input
          type="text"
          placeholder="Token Address (ERC20 contract)"
          value={tokenAddress}
          onChange={e => setTokenAddress(e.target.value as Address)}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Recipient Wallet Address"
          value={recipientAddress}
          onChange={e => setRecipientAddress(e.target.value as Address)}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          placeholder="Amount in wei"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSendToken} className="btn btn-primary w-full">
          Send Token
        </button>

        <hr />

        <h2 className="text-xl font-bold">Withdraw ETH</h2>
        <input
          type="text"
          placeholder="Withdraw To Wallet Address"
          value={withdrawAddress}
          onChange={e => setWithdrawAddress(e.target.value as Address)}
          className="input input-bordered w-full"
        />
        <button onClick={handleWithdrawETH} className="btn btn-secondary w-full">
          Withdraw ETH
        </button>
      </div>
    </>
  );
};
