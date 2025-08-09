"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

type Address = string;

export const TokenTransferUI = () => {
  // recipient is fixed as requested
  const recipientAddress: Address = "0x9ca48Da9010111a70cFE5757b7eE7CBf86BA0f9A";
  // token address input removed; assuming USDC token address is configured on contract or preset on-chain.
  const [amount, setAmount] = useState<string>("");

  // Hook for contract interaction
  const { writeContractAsync } = useScaffoldWriteContract("TokenTransfer");

  const handleSendToken = async () => {
    try {
      await writeContractAsync({
        functionName: "sendToken",
        // args: tokenAddress, recipient, amount (wei). We pass undefined for token so contract defaults to USDC
        args: [undefined, recipientAddress, BigInt(amount) as unknown as bigint],
      });
      alert("Token sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Error sending token");
    }
  };

  // Withdraw removed from this UI per new flow

  return (
    <>
      <ConnectButton />
      <div className="p-6 bg-base-200 rounded-xl max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-bold">Pay Creator</h2>
        <div className="text-sm">
          Recipient: <span className="font-mono break-all">{recipientAddress}</span>
        </div>
        <input
          type="number"
          placeholder="Amount in wei"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSendToken} className="btn btn-primary w-full">
          Pay Now
        </button>
      </div>
    </>
  );
};
