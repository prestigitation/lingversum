import UserInterface from "@/interfaces/userInterface";

export default () => ({
  user: <UserInterface>{
    email: undefined,
    token: undefined,
    name: undefined,
    profile: {},
  },
});
