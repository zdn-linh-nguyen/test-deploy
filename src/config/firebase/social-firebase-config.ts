import userAPI from "@/api/userApi";
import { ISocialLoginData } from "@/types/interface";
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.FIREBASE_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	// apiKey: "AIzaSyBJ7ZO4cuYd-rvEMAp_RANMEf8e5YpN7Vc",
	// authDomain: "dinder-36863.firebaseapp.com",
	// projectId: "dinder-36863",
	// storageBucket: "dinder-36863.appspot.com",
	// messagingSenderId: "268317355008",
	// appId: "1:268317355008:web:7c956ea1307ca637073ce5",
};

const firebase = initializeApp(firebaseConfig);

export const authentication = getAuth(firebase);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = async (): Promise<ISocialLoginData> => {
	try {
		const res = await signInWithPopup(authentication, googleProvider);
		const { displayName, email, uid } = res.user;

		const checkRes = await userAPI.checkSocial(uid);

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

		const checkRes = await userAPI.checkSocial(uid);

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
