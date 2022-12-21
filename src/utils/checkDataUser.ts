import { User } from '../models/userModel';
import { checkArrayForString } from './checkArrayForString';

export function isValidDataUser({ username, age, hobbies }: Omit<User, 'id'>) {
  // let isValid = true;

  if (typeof username !== 'string') {
    // isValid = false;
    return false;
  }

  if (typeof age !== 'number') {
    return false;
  }

  if (Array.isArray(hobbies)) {
    return checkArrayForString(hobbies);
  } else return false;
}
