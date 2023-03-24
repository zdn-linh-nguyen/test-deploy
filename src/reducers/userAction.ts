import profileAPI from "@/api/profileApi";
import { toastError } from "@/utils/toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetUser } from "./userSlice";

export const getProfile = createAsyncThunk("user/getProfile", async (_data, thunkApi) => {
	try {
		const user = await profileAPI.getProfile();
		return user;
	} catch (error) {
		thunkApi.dispatch(resetUser());
		toastError("Vui lòng đăng nhập!");
		return thunkApi.rejectWithValue(error);
	}
});
