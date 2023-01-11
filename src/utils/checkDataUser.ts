import { User } from '../models/userModel';
import { checkArrayForString } from './checkArrayForString';

export function isValidDataUser({ username, age, hobbies }: Omit<User, 'id'>) {
  // let isValid = true;

  if (typeof username !== 'string') {
    // isValid = false;
    return false;
  }

  if (typeof age !== 'number' || age < 0) {
    return false;
  }

  if (Array.isArray(hobbies)) {
    return checkArrayForString(hobbies);
  } else return false;
}

export function isValidUuid(id: string) {
  const reg = /^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/;
  return id.match(reg);
}
