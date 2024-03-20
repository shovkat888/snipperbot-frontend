import api from "../utils/api";

export function useAuth() {
  async function loadUser(address) {
    try {
      const res = await api.post("/users", { address });

      return res.data;
    } catch (e) {}
  }

  return {
    loadUser,
  };
}
