import { useRouter } from "next/router";
import { useEffect } from "react";

interface IProps {
	children: React.ReactNode;
	adminOnly?: boolean;
	isToken?: boolean;
}

export default function ProtectRoute({ children, adminOnly, isToken }: IProps) {
	const router = useRouter();
	// const sUser = useAppSelector(selectUser);

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

	return <>{children}</>;
}
