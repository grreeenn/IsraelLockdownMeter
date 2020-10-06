import {createContext} from "react";
import {IUserSettings} from "./types/IUser";

type TGlobalContext = {
  userSettings: IUserSettings | null;
  updateUserSettings: () => void
}

export const GlobalContext = createContext<TGlobalContext>({
    userSettings: null,
    updateUserSettings: () => {}
  }
);

export const LocalizationContext = createContext({});
