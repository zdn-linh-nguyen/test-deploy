// Import the functions you need from the SDKs you need
import userAPI from "@/api/userApi";
import { ISocialLoginData } from "@/types/interface";
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAw_97atjB5x75mXoeARnfuatwCFV8inS8",
	authDomain: "dinder-2-23a23.firebaseapp.com",
	projectId: "dinder-2-23a23",
	storageBucket: "dinder-2-23a23.appspot.com",
	messagingSenderId: "682548161020",
	appId: "1:682548161020:web:3016c0e78c1e366e6fea79",
	// apiKey: "AIzaSyBJ7ZO4cuYd-rvEMAp_RANMEf8e5YpN7Vc",
	// authDomain: "dinder-36863.firebaseapp.com",
	// projectId: "dinder-36863",
	// storageBucket: "dinder-36863.appspot.com",
	// messagingSenderId: "268317355008",
	// appId: "1:268317355008:web:7c956ea1307ca637073ce5",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const authentication = getAuth(firebase);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = async (): Promise<ISocialLoginData> => {
	try {
		const res = await signInWithPopup(authentication, googleProvider);
		const { displayName, email, uid } = res.user;

		const checkRes = await userAPI.checkSocial(res.user.uid);

		return {
			name: displayName,
			email,
			socialId: uid,
			checkData: checkRes.data,
		};
	} catch (err: any) {
		throw err;
	}
};

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithFacebook = async (): Promise<ISocialLoginData> => {
	try {
		const res = await signInWithPopup(authentication, facebookProvider);
		const { displayName, email, uid } = res.user;

		const checkRes = await userAPI.checkSocial(res.user.uid);

		return {
			name: displayName,
			email,
			socialId: uid,
			checkData: checkRes.data,
		};
	} catch (err) {
		throw err;
	}
};
