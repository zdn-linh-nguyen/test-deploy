export interface IUserGender {
  // id: string;
  name: string;
}

interface IUserStatus {
  isFirstUpdate: boolean;
  isVerified: boolean;
  isActive: boolean;
}

export interface IUserInterests {
  // id: string;
  name: string;
}

export interface IUserName {
  firstName: string;
  lastName: string;
}

export interface IUserMatch {
  id: string;
  email: string;
  avatar: string;
  name: IUserName;
}

export interface IUserLocation {
  latitude: number;
  longitude: number;
  updatedAt?: string;
}

interface IAlbums {
  id: string;
  url: string;
  isFavorite: boolean;
  isDefault: boolean;
}

interface IProfile {
  bio: string;
  albums: IAlbums[];
  height: number;
  reason: string;
  drinking: boolean;
  religion: boolean;
  education: IEducation;
  interests: IUserInterests[];
  gender: IUserGender;
}

export interface IUser {
  id: string;
  name: IUserName;
  avatar: string;
  age: number;
  phone: string;
  email: string;
  birthday: string;
  lastLocation: IUserLocation;
  distance: number;
  info: IProfile;
  status: IUserStatus;
  match: IUserMatch[];
  // block: IUserBlock[];
}

export interface IUserRegister {
  phone?: string;
  name: string;
  email: string;
  birthday: string;
  gender: string;
  socialId: string | null;
}

export interface ISocialLoginData {
  name: string | null;
  email: string | null;
  socialId: string | null;
  checkData: {
    checked: boolean;
    phone?: string;
  } | null;
}

export interface IProfileUpdateData {
  name?: string;

  gender?: string;

  reason?: string;

  description?: string;

  height?: number;

  religion?: string;

  drinking?: boolean;

  education?: string;

  interests?: string[];
}

export interface IProfileData {
  userId: string;
  name: string;
  gender: string;
  birthday: string;
  description: string;
  reason: string;
  avatar: string;
  height: number;
  religion: string;
  drinking: boolean;
  education: string;
  interests: string[];
}
