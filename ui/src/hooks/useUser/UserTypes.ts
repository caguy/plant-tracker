import { UserProfile } from "@/settings";

export interface UserInfos {
  username: string;
  fullName: string;
  profile: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserState {
  login: (authInfos: {
    username: string;
    password: string;
    redirectTo?: string | null;
  }) => void;
  logout: () => void;
  checkCredentials: (params?: { redirectTo?: string | null }) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken?: string | null;
  userInfos?: UserInfos | null;
}
