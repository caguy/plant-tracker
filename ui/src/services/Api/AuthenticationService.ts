import { UserProfile } from "@/settings";
import { FetchFunction } from "./ApiTypes";

type User = {
  username: string;
  fullName: string;
  profile: UserProfile;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthenticateResponse = {
  accessToken: string;
  userInfos: User;
};

export type CheckCredentialsResponse = User;

export default (fetch: FetchFunction) => ({
  authenticate: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = await fetch<AuthenticateResponse>("/auth/login", {
      method: "POST",
      data: { username, password },
    });

    return {
      ...response.data,
      userInfos: {
        ...response.data.userInfos,
        createdAt: new Date(response.data.userInfos.createdAt),
        updatedAt: new Date(response.data.userInfos.updatedAt),
      },
    };
  },

  checkCredentials: async () => {
    const response = (await fetch<CheckCredentialsResponse>("/users/me")).data;
    return {
      ...response,
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
    };
  },
});
