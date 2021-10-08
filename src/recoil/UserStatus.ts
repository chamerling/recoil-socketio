import { atom, DefaultValue, selectorFamily } from "recoil";
import { UserStatus as UserStatusModel } from "../types/Message";

export const UserStatusAtom = atom<UserStatusModel[]>({
  key: 'UserStatusAtom',
  default: [],
});

export const UserStatusSelectorFamily = selectorFamily<boolean, string>({
  key: 'UserStatusSelectorFamily',
  get: (id) => ({ get }) => {
    return get(UserStatusAtom).find(u => u.id === id)?.connected || false;
  },
  set: (id) => ({ set }, status) => {
    set(UserStatusAtom, (previousStatus) => {

      if (status instanceof DefaultValue) {
        return previousStatus;
      }

      const connected = status as boolean;
      const index = previousStatus.findIndex(status => status.id === id);

      if (index === -1) {
        previousStatus = [...previousStatus, { id, connected }];
      } else {
        previousStatus = [...previousStatus.slice(0, index), {id, connected}, ...previousStatus.slice(index + 1)]
      }

      return previousStatus;
    });
  },
});
