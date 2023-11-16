import {
  FC,
  PropsWithChildren,
  useEffect,
  useReducer,
} from "react";

import Cookies from "js-cookie";

import { authReducer, AuthContext } from ".";
import { IUser } from "@/interfaces";
import { soulisStoreApi } from "@/api";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export interface IAuthState {
  isLoggedIn : boolean;
  user      ?: IUser;
}
const AUTH_INITIAL_STATE: IAuthState = {
  isLoggedIn: false,
  user      : undefined,
};

export interface IRegisterUser {
  hasError : boolean;
  message ?: string;
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router            = useRouter();

  const {data, status} = useSession();

   useEffect(() => {
     if (status === "authenticated") {
       dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
       console.log({ user: data?.user });
     }
   }, [status, data]);
  
  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async() => {

    // if (!Cookies.get('token')) return;

    try {
      const { data }        = await soulisStoreApi.get("/user/validate-token");
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });

      return true;
    } catch (error) {
      Cookies.remove("token");
      return false;
    }
  }

  const loginUser = async (email: string, password: string) : Promise<boolean> => {
    try {
      const { data } = await soulisStoreApi.post('/user/login', {email, password});
      const  { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user})

      return true;
    } catch (error) {
      return false
    }
  }

  const registerUser = async (name: string, email: string, password: string) : Promise<IRegisterUser> => {
    try {
      const { data } = await soulisStoreApi.post('/user/register', {name, email, password});
      const  { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user});

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message : error.response?.data.message
        }
      }
      return {
        hasError: true,
        message : 'No se pudo crear el usuario'
      }
    }
  }


  const logOut = () => {
    Cookies.remove("cart");
    Cookies.get("firstName");
    Cookies.get("lastName");
      Cookies.get("address");
      Cookies.get("address2");
      Cookies.get("zip");
      Cookies.get("city");
      Cookies.get("country");
      Cookies.get("phone");

      signOut();

      // Cookies.remove("token");
      // router.reload();
  }

  return (
    <AuthContext.Provider
      value={{ ...state, loginUser, registerUser, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
