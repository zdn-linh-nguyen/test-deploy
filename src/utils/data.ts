const match: any = [
	{
		_id: "2",
		name: {
			firstName: "Jane",
			lastName: "Doe",
		},
		avatar: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
		email: "jane@gmail.com",
	},
	{
		_id: "3",
		name: {
			firstName: "Zoey",
			lastName: "Doe",
		},
		avatar: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
		email: "zoey@gmail.com",
	},
	{
		_id: "4",
		name: {
			firstName: "Jane",
			lastName: "Doe",
		},
		avatar: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
		email: "jane@gmail.com",
	},
	{
		_id: "5",
		name: {
			firstName: "Zoey",
			lastName: "Doe",
		},
		avatar: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
		email: "zoey@gmail.com",
	},
];

const conversation: any = [
	{
		_id: "1",
		users: [
			{
				_id: "user1",
				name: { firstName: "John", lastName: "Doe" },
				avatar: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
				lastLogin: "2022-03-13T14:30:00Z",
			},
			{
				_id: "user2",
				name: { first: "Jane", lastName: "Doe" },
				avatar: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
				lastLogin: "2022-03-13T14:31:00Z",
			},
		],
		messages: [
			{
				senderId: {
					_id: "user1",
					name: { first: "John", lastName: "Doe" },
					avatar: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
					lastLogin: "2022-03-13T14:30:00Z",
				},
				messages: [
					{
						type: "text",
						value: "Hi, Jane!",
						createdAt: "2022-03-13T14:32:00Z",
						updatedAt: "2022-03-13T14:32:00Z",
					},
					{
						type: "text",
						value: "How are you?",
						createdAt: "2022-03-13T14:33:00Z",
						updatedAt: "2022-03-13T14:33:00Z",
					},
				],
			},
		],
		updatedAt: "2022-03-13T14:33:00Z",
	},
];

const profile: any = {
	_id: "1",
	name: {
		firstName: "Nhat",
		lastName: "Linh",
	},
	email: "john@gmail.com",
	phone: "0916030512",
	birthday: "2001-05-24",
	status: {
		isFirstUpdate: true,
		isVerified: true,
		isActive: true,
	},
	avatar: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
	age: 26,

	lastLocation: {
		latitude: 10.75993958835834,
		longitude: 106.67893207586309,
		updatedAt: "2020-01-01T00:00:00.000Z",
	},
	distance: 10,

	info: {
		albums: [
			{
				_id: "1",
				url: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
				isFavorite: true,
				isDefault: true,
			},
			{
				_id: "2",
				url: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
				isFavorite: false,
				isDefault: false,
			},
			{
				_id: "3",
				url: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
				isFavorite: false,
				isDefault: false,
			},
			{
				_id: "4",
				url: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
				isFavorite: false,
				isDefault: false,
			},
			{
				_id: "5",
				url: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
				isFavorite: false,
				isDefault: false,
			},
			{
				_id: "6",
				url: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
				isFavorite: false,
				isDefault: false,
			},
			{
				_id: "7",
				url: "https://res.cloudinary.com/azurestore/image/upload/v1672594101/ShoeBeeDoo/mchwi95l9cupnqphns0y.jpg",
				isFavorite: false,
				isDefault: false,
			},
		],
		bio: "Looking for someone to share my adventures with Looking for someone to share my adventures with Looking for someone to share my adventures with",
		height: 180,
		reason: "Đang tìm một mối quan hệ mới",
		drinking: true,
		religion: true,
		education: {
			_id: 1,
			label: "Đại học",
		},
		gender: {
			_id: "1",
			name: "male",
		},
		interests: [
			{
				_id: "1",
				name: "coffee",
			},
			{
				_id: "2",
				name: "reading",
			},
		],
	},

	match: [
		{
			id: "2",
			name: {
				firstName: "Jane",
				lastName: "Doe",
			},
			avatar: "https://res.cloudinary.com/azurestore/image/upload/v1678690594/avatars/bighead-10_zbyosz.svg",
			email: "jane@gmail.com",
		},
		{
			id: "3",
			name: {
				firstName: "Zoey",
				lastName: "Doe",
			},
			avatar: "https://res.cloudinary.com/azurestore/image/upload/v1678690594/avatars/bighead-10_zbyosz.svg",
			email: "zoey@gmail.com",
		},
	],
};

// const reasonOptions: IReasonOption[] = [
//   {
//     _id: 1,
//     value: "DATE",
//     label: "Muốn hẹn hò",
//   },
//   {
//     _id: 2,
//     value: "CHAT",
//     label: "Muốn tâm sự",
//   },
//   {
//     _id: 3,
//     value: "FRIEND",
//     label: "Muốn kết bạn bốn phương",
//   },
// ];

const genderOptions: IGenderOption[] = [
	{
		_id: 1,
		value: "MALE",
		label: "Nam",
	},
	{
		_id: 2,
		value: "FEMALE",
		label: "Nữ",
	},
	{
		_id: 3,
		value: "OTHER",
		label: "Khác",
	},
];

const educationOptions: IEducation[] = [
	{
		_id: 1,
		value: "HIGH-SCHOOL",
		label: "Trung học",
	},
	{
		_id: 2,
		value: "HIGHER",
		label: "Đại học",
	},
];

const drinkingOptions: IDrinkingOption[] = [
	{
		_id: 1,
		value: "YES",
		label: "Có",
	},
	{
		_id: 2,
		value: "NO",
		label: "Không",
	},
];

const religionOptions: IReligionOption[] = [
	{
		_id: 1,
		value: "CHRISTIAN",
		label: "Công giáo",
	},
	{
		_id: 2,
		value: "BUDDHISM",
		label: "Phật giáo",
	},
	{
		_id: 3,
		value: "OTHER",
		label: "Khác",
	},
];

export { conversation, drinkingOptions, educationOptions, genderOptions, match, profile, religionOptions };
