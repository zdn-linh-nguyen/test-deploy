import { useEffect, useState } from "react";
import NotSupport from "../noSupport";

interface Props {
	children: React.ReactNode;
}

export default function ScreenRoute({ children }: Props) {
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined" && window.screen) {
			if (window.screen.width >= 768) {
				setIsValid(true);
			}
		}
	}, []);
	return <>{isValid ? <NotSupport /> : children} </>;
}
