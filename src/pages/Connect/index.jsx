import { useState, useEffect } from "react";
import { ICLogo, ICWallet } from "../../assets";
import { WalletConnect } from "../../components/Buttons";

function ConnectPage() {
  return (
    <>
      <header className="container mx-auto my-5">
        <div className="flex items-center gap-3">
          <img src={ICLogo} alt="logo" />
          <p className="font-extrabold text-xl text-[#171A1F]">Kinety</p>
        </div>
      </header>
      <main className="container mx-auto">
        <div className="w-96 flex flex-col mx-auto gap-10 py-20">
          <img className="mx-auto" src={ICWallet} alt="wallet" width={100} />
          <p className="font-extrabold text-3xl text-center">
            Connect your wallet!
          </p>
          <WalletConnect />
        </div>
      </main>
    </>
  );
}

export default ConnectPage;
