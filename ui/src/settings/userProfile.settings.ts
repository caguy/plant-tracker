export type UserProfile = "ADMIN" | "USER";

export const UserProfileSetup = {
  ADMIN: {
    label: "Administrateur",
  },
  USER: {
    label: "Utilisateur",
  },
};

export const getUserProfileLabel = (profile: UserProfile) =>
  UserProfileSetup[profile].label;
