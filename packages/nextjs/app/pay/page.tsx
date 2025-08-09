"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { parseUnits } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

/**
 * Payment page: summary + Connect + Pay Now.
 * Uses a fixed recipient and sends USDC with 6 decimals via TokenTransfer contract.
 */
const PayPage: NextPage = () => {
  const params = useSearchParams();
  const { writeContractAsync, isMining } = useScaffoldWriteContract("TokenTransfer");

  const RECIPIENT = "0x9ca48Da9010111a70cFE5757b7eE7CBf86BA0f9A";

  const data = useMemo(() => {
    const amount = params.get("amount") || "0";
    const seconds = params.get("seconds") || "0";
    const title = params.get("title") || "";
    const courseId = params.get("courseId") || "";
    return { amount, seconds, title, courseId };
  }, [params]);

  const amountWei = useMemo(() => {
    try {
      // USDC has 6 decimals
      return parseUnits(data.amount, 6);
    } catch {
      return 0n;
    }
  }, [data.amount]);

  const ensureSepoliaNetwork = async () => {
    const ethereum = (window as any)?.ethereum;
    if (!ethereum?.request) return;
    try {
      const chainId: string = await ethereum.request({ method: "eth_chainId" });
      if (chainId === "0xaa36a7") return; // Sepolia
      try {
        await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0xaa36a7" }] });
      } catch (switchErr: any) {
        // If the chain is not added to the wallet, add it
        if (switchErr?.code === 4902) {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xaa36a7",
                chainName: "Sepolia Test Network",
                nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
                rpcUrls: ["https://sepolia.infura.io/v3/"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          });
          await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0xaa36a7" }] });
        } else {
          throw switchErr;
        }
      }
    } catch (err) {
      console.error("Network switch failed", err);
      throw err;
    }
  };

  const handlePay = async () => {
    try {
      // Ensure user is on Sepolia testnet
      await ensureSepoliaNetwork();
      await writeContractAsync({
        functionName: "sendToken",
        // Let the contract default to USDC when token address is undefined
        args: [undefined, RECIPIENT, amountWei],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">Complete Payment</h1>
            <Link
              href={data.courseId ? `/courses/${data.courseId}` : "/courses"}
              className="text-white/70 hover:text-white"
            >
              Back to Course
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-3">Summary</h2>
              <div className="space-y-2 text-white/80">
                <div>
                  Course: <span className="font-semibold text-white">{data.title || "Untitled"}</span>
                </div>
                <div>
                  Watched: <span className="font-semibold text-white">{data.seconds}s</span>
                </div>
                <div>
                  Amount Due: <span className="font-semibold text-green-400">${data.amount} USDC</span>
                </div>
                <div>
                  Recipient: <span className="font-mono break-all">{RECIPIENT}</span>
                </div>
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Pay with Wallet</h2>
              <div className="mb-4">
                <ConnectButton />
              </div>
              <button
                onClick={handlePay}
                disabled={amountWei === 0n || isMining}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold disabled:opacity-50"
              >
                {isMining ? "Processing..." : `Pay ${data.amount} USDC`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
