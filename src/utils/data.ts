const genderOptions: IGenderOption[] = [
	{
		id: 1,
		value: "MALE",
		label: "Nam",
	},
	{
		id: 2,
		value: "FEMALE",
		label: "Nữ",
	},
	{
		id: 3,
		value: "OTHER",
		label: "Khác",
	},
];

const educationOptions: IEducation[] = [
	{
		id: 1,
		value: "HIGH-SCHOOL",
		label: "Trung học",
	},
	{
		id: 2,
		value: "HIGHER",
		label: "Đại học",
	},
];

const drinkingOptions: IDrinkingOption[] = [
	{
		id: 1,
		value: "YES",
		label: "Có",
	},
	{
		id: 2,
		value: "NO",
		label: "Không",
	},
];

const religionOptions: IReligionOption[] = [
	{
		id: 1,
		value: "CHRISTIAN",
		label: "Công giáo",
	},
	{
		id: 2,
		value: "BUDDHISM",
		label: "Phật giáo",
	},
	{
		id: 3,
		value: "OTHER",
		label: "Khác",
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

export { conversation, drinkingOptions, educationOptions, genderOptions, religionOptions };
