import { useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function WalletConnect() {
  const connector = injected({ target: "metaMask" });
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  return (
    <>
      {!address ? (
        <button
          className="bg-[#565E6D] hover:bg-gray-400 w-full text-white p-3"
          onClick={() => connect({ connector })}
        >
          Connect
        </button>
      ) : (
        <button
          className="bg-[#565E6D] hover:bg-gray-400 w-full text-white p-3"
          onClick={() => disconnect()}
        >
          {address.slice(0, 5)} ... {address.slice(39, 43)}
        </button>
      )}
    </>
  );
}
