import * as bcrypt from 'bcrypt';

export function hash(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export function compare(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}
