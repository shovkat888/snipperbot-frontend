import api from "../utils/api";

export function useWallet() {
  async function depositWallet(user) {
    try {
      const res = await api.post("/wallets", { user });

      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function updateDeposit(user) {
    try {
      const res = await api.post("/wallets/deposit", { user });

      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function withdraw(user) {
    try {
      const res = await api.post("/wallets/withdraw", { user });

      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  return {
    depositWallet,
    updateDeposit,
    withdraw,
  };
}
