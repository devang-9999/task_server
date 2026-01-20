/* eslint-disable prettier/prettier */
import { Status } from '../enums/status.enums';

export function isValidTransition(
  current: Status,
  next: Status,
): boolean {
  if (current === Status.COMPLETED) return false;
  if (current === Status.PENDING && next === Status.COMPLETED) return false;
  return true;
}
