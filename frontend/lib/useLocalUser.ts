export const useLocalUser = () => {
  return {
    user: {
      id: "local-user",
      name: "Local Dev User",
      email: "dev@localhost",
    },
    isLoggedIn: true,
    logout: () => console.log("logout (local)"),
    deleteAccount: () => console.log("delete account (local)"),
  }
}
