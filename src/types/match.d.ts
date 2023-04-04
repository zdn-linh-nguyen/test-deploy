declare interface IUserMatch {
	id: string;
	email: string;
	avatar: string;
	name: string;
	isSeen: boolean;
	userFromId: string;
	userToId: string;
	fromUserName: string;
	toUserName: string;
	fromAvatar: string;
	toAvatar: string;
	type: string;
}

declare interface IHeart {
	top?: number;
	left?: number;
	bottom?: number;
	width: number;
	tilt: number;
}
