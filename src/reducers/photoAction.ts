import photoAPI from "@/api/photoApi";
import { toastError } from "@/utils/toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { resetUser } from "./userSlice";

export const getListPhoto = createAsyncThunk("photo/getListPhoto", async (data, thunkApi) => {
	try {
		const res = await photoAPI.getMyPhotos();
		return res;
	} catch (error) {
		thunkApi.dispatch(resetUser());
		return thunkApi.rejectWithValue(error);
	}
});

export const updateFavorite = createAsyncThunk(
	"photo/updateFavorite",
	async (
		data: {
			publicId: string;
		},
		thunkApi
	) => {
		try {
			const res = await photoAPI.updateFavorite(data.publicId);
			return res;
		} catch (error) {
			// thunkApi.dispatch(resetUser());
			toast.error("Something went wrong!");
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const updateAvatar = createAsyncThunk(
	"photo/updateAvatar",
	async (
		data: {
			publicId: string;
		},
		thunkApi
	) => {
		try {
			const res = await photoAPI.updateAvatar(data.publicId);
			return res;
		} catch (error) {
			// thunkApi.dispatch(resetUser());
			toastError("Something went wrong!");
			return thunkApi.rejectWithValue(error);
		}
	}
);

// export const uploadImages = createAsyncThunk("photo/uploadImages", async (data: FormData, thunkAPI) => {
// 	try {
// 		const res = await photoAPI.uploadImages(data);
// 		console.log("res uploadImages", res);
// 		return res;
// 	} catch (error) {
// 		return thunkAPI.rejectWithValue(error);
// 	}
// });
