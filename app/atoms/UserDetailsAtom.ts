import { atom } from "jotai";

interface UserDetails {
  id: number;
  name: string;
  email: string;
  imageURL: string;
  credits: number;
}

export const userDetailsAtom = atom<UserDetails | null>(null);
