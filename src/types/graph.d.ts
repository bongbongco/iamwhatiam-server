export const typeDefs = ["type User {\n  id: Int!\n  email: String!\n  verifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  age: Int!\n  password: String!\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String!\n  fullName: String!\n  isDriving: Boolean!\n  isRiding: Boolean!\n  isTaken: Boolean!\n  lastLng: Float!\n  lastLat: Float!\n  lastOrientation: Float!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype Query {\n  user: User\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  used: Boolean!\n  createdAt: String!\n  updatedAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  user: User | null;
}

export interface User {
  id: number;
  email: string;
  verifiedEmail: boolean;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
  phoneNumber: string;
  verifiedPhoneNumber: boolean;
  profilePhoto: string;
  fullName: string;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  lastLng: number;
  lastLat: number;
  lastOrientation: number;
  createdAt: string;
  updatedAt: string;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  used: boolean;
  createdAt: string;
  updatedAt: string;
}
