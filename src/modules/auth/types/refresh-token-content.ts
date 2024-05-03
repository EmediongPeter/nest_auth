/** What is returned to the application after Refresh JsonWebToken is validated */
export type RefreshTokenContent = {
  userId: string;

  refreshToken: string;
};
