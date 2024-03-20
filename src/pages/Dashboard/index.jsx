import { useState, useEffect } from "react";
import { ICTelegram } from "../../assets";
import { WalletConnect } from "../../components/Buttons/WalletConnect";
import { useAccount, useSendTransaction } from "wagmi";
import { waitForTransactionReceipt, getBalance } from "@wagmi/core";
import { parseEther } from "viem";
import { useAuth } from "../../hooks/useAuth";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import { useWallet } from "../../hooks/useWallet";
import { bsc, bscTestnet } from "viem/chains";
import { config } from "../../config";

function DashboardPage() {
  const { data: hash, sendTransaction } = useSendTransaction();
  const { address } = useAccount();
  const { loadUser } = useAuth();
  const { depositWallet, updateDeposit, withdraw } = useWallet();
  const [user, setUser] = useState();
  const [depositValue, setDepositValue] = useState(0);
  const [bnbBalance, setBNBBalance] = useState(0);
  const [wallet, setWallet] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const balance = await getBalance(config, {
          address: wallet?.address,
        });
        console.log(balance);

        if (balance) {
          setBNBBalance(balance.formatted);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [wallet]);

  useEffect(() => {
    async function getData() {
      const res = await depositWallet(user.id);
      setWallet(res.data);
    }
    if (user) {
      getData(address);
    }
  }, [user]);

  useEffectOnce(() => {
    async function getData(address) {
      const res = await loadUser(address);
      setUser(res.data);
    }
    if (address) {
      getData(address);
    }
  }, address);

  function isFloat(str) {
    return !isNaN(parseFloat(str));
  }

  async function handleDeposit() {
    if (!isFloat(depositValue)) return;
    if (!address) return;
    if (!wallet) return;

    sendTransaction({
      to: wallet.address,
      value: parseEther(depositValue),
    });
  }

  async function handleClaim() {
    if (parseFloat(bnbBalance) > 0) {
      if (!address) return;
      if (!user) return;

      const res = await withdraw(user.id);

      if (res) {
        console.log("Withdraw successfully");
      }
    }
  }

  useEffect(() => {
    async function waitTxn() {
      if (hash) {
        const txnReceipt = await waitForTransactionReceipt(config, {
          chainId: bsc.id,
          hash: hash,
        });

        console.log(txnReceipt);
        if (txnReceipt) {
          await updateDeposit(user.id);
        }
      }
    }
    waitTxn();
  }, [hash]);

  return (
    <>
      <header className="container mx-auto flex justify-between items-center my-5">
        <div className="font-medium text-3xl text-[#171A1F]">
          User Dashboard
        </div>
        <div className="flex justify-between items-center gap-10">
          <div className="flex gap-2">
            Support <img src={ICTelegram} />
          </div>
          <div className="w-48">
            <WalletConnect />
          </div>
        </div>
      </header>
      <main className="container mx-auto">
        <section className="sm:flex gap-5 mt-10">
          <div className="flex flex-col gap-5 sm:w-7/12 border-2 border-[#DEE1E6] py-10 px-4 w-full">
            <div className="flex justify-between items-center w-full">
              <label className="font-medium text-2xl text-[#171A1F]">
                Funds:
              </label>
              <input
                onChange={(e) => setDepositValue(e.target.value)}
                placeholder="Input number"
                className="outline-none border-2 border-[#9095A0] py-5 px-3 w-10/12"
              />
            </div>
            <button
              className="bg-[#565E6D] hover:bg-gray-400 w-full text-white py-5"
              onClick={handleDeposit}
            >
              DEPOSIT
            </button>
          </div>
          <div className="flex sm:w-5/12 border-2 border-[#DEE1E6] p-4 w-full">
            <p className="font-extrabold">Deposit History</p>
          </div>
        </section>
        <section className="sm:flex gap-5 mt-10">
          <div className="flex flex-col gap-5 sm:w-7/12 border-2 border-[#DEE1E6] py-10 px-4 w-full">
            <div className="flex justify-between items-center w-full">
              <label className="font-medium text-2xl text-[#171A1F]">
                Available BNB:
              </label>
              <p className="text-lg font-[#171A1F] font-bold">{bnbBalance}</p>
            </div>
            <button
              className="bg-[#565E6D] hover:bg-gray-400 w-full text-white py-5"
              onClick={handleClaim}
            >
              CLAIM
            </button>
          </div>
          <div className="flex sm:w-5/12 border-2 border-[#DEE1E6] p-4 w-full">
            <p className="font-extrabold">Withdraw History</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default DashboardPage;
