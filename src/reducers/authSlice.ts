import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
enum IType {
  Login = "login",
  Register = "register",
  SocialLogin = "social_login",
  SocialRegister = "social_register",
}
interface IInfoUser {
  phone: string;
  name: string;
  email: string;
  birthday: string;
  gender: string;
  socialId?: string;
}
interface IInitialState {
  type: IType;
  infoUser: IInfoUser;
}
const initialState: IInitialState = {
  type: IType.Login,
  infoUser: {
    phone: "",
    name: "",
    email: "",
    birthday: "",
    gender: "",
    socialId: undefined,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setRegister: (state, action) => {
      state.type = IType.Register;
      state.infoUser.phone = action.payload;
    },
    setAuthUser: (state, action) => {
      state.type = IType.SocialRegister;
      state.infoUser = action.payload;
    },
    setSocialLogin: (state, action) => {
      state.type = IType.SocialLogin;
      state.infoUser = action.payload;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setRegister, setAuthUser, setSocialLogin } = authSlice.actions;
export default authSlice.reducer;
