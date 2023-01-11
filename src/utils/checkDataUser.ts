import { User } from '../models/userModel';
import { checkArrayForString } from './checkArrayForString';

export function isValidDataUser({ username, age, hobbies }: Omit<User, 'id'>) {
  if (typeof username !== 'string') {
    return false;
  }

  if (typeof age !== 'number' || age < 0) {
    return false;
  }

  if (Array.isArray(hobbies)) {
    return checkArrayForString(hobbies);
  } else return false;
}
