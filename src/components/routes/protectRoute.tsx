import { useAppSelector } from "@/app/store";
import { selectMatch } from "@/reducers/matchSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Matching from "../match";

interface IProps {
	children: React.ReactNode;
	adminOnly?: boolean;
	isToken?: boolean;
}

export default function ProtectRoute({ children, adminOnly, isToken }: IProps) {
	const router = useRouter();
	const sMatch = useAppSelector(selectMatch).isShow;

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			router.push("/");
		} else if (isToken) {
			router.push("/swipe");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// if (adminOnly && sUser.role === "user") {
	// 	router.push("/notfound");
	// }

	return (
		<>
			{sMatch && <Matching />}
			{children}
		</>
	);
}
