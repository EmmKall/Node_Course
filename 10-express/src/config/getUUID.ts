import { v4 as uuidv4 } from 'uuid';

export const getRamdomChain = (n: number = 12):string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const array = crypto.getRandomValues(new Uint32Array(n));
    return Array.from(array, (x) => chars[x % chars.length]).join("");
}

export const getUUID = (): string => {
  return uuidv4();
}
