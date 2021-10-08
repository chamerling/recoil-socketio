import { atom, selector } from "recoil";
import { User } from "../types/Message";

export const UsersAtom = atom<User[]>({
  key: 'UsersAtom',
  default: [],
});

export const Users = selector<User[]>({
  key: 'UsersSelector',
  get: async () => {
    console.log("GET users");

    try {
      const response = await fetch("http://localhost:8080/users");

      return response.json();
    } catch(err) {
      console.log("Can not get users");
    }
  }
});