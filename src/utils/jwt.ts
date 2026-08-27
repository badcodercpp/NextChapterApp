import { JwtPayload, jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token?: string | null): boolean => {
  if (!token) {
    return true;
  }

  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    console.log('exp for token', exp);

    if (!exp) {
      return true;
    }

    return exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};
