export interface OAuthProvider {
  name: string;
  scope: string[];
  clientId: string;
  clientSecret: string;
  callbackURL: string;
}

export interface OAuthProfile {
  provider: string;
  providerId: string;
  email: string;
  name?: string;
  picture?: string;
}
