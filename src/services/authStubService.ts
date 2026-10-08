import seededUsers from '../data/authStubUsers.json';
import { normalizeIndianMobile } from '../utils/phone';

export type AuthRole = 'customer' | 'shopkeeper';

export type AuthStubUser = {
  id: string;
  phone: string;
  email?: string;
  password: string;
  otp: string;
  name: string;
  role: AuthRole;
};

export type StubSignupInput = {
  phone: string;
  password: string;
  name: string;
  email?: string;
  role: AuthRole;
};

export const TEST_OTP = '123456';
export const seededAuthUsers = seededUsers as AuthStubUser[];

export function findAuthStubUser(
  users: AuthStubUser[],
  identifier: string,
  role?: AuthRole,
): AuthStubUser | undefined {
  const normalizedPhone = normalizeIndianMobile(identifier);
  const normalizedIdentifier = identifier.trim().toLowerCase();

  return users.find(user => {
    const matchesIdentifier = user.phone === normalizedPhone || user.email?.toLowerCase() === normalizedIdentifier;
    return matchesIdentifier && (!role || user.role === role);
  });
}

export function createAuthStubUser(
  users: AuthStubUser[],
  input: StubSignupInput,
): AuthStubUser | null {
  const phone = normalizeIndianMobile(input.phone);
  const email = input.email?.trim().toLowerCase();
  const phoneTaken = users.some(user => user.phone === phone);
  const emailTaken = email ? users.some(user => user.email?.toLowerCase() === email) : false;

  if (!phone || phoneTaken || emailTaken) {
    return null;
  }

  return {
    id: `demo-${input.role}-${phone}`,
    phone,
    email,
    password: input.password,
    otp: TEST_OTP,
    name: input.name.trim(),
    role: input.role,
  };
}

export function isValidStubPassword(user: AuthStubUser, password: string): boolean {
  return user.password === password;
}

export function isValidStubOtp(user: AuthStubUser, otp: string): boolean {
  return user.otp === otp;
}
