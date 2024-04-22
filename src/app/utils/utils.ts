import {CALENDAR_INTERVALS} from './enum';

export function nameOfFactory<T>(name: keyof T): any {
  return name;
}

export function asInstance<T>(data: any): T {
  return data as T;
}

export function getYearRange(): string {
  return CALENDAR_INTERVALS.startDate + ':' + CALENDAR_INTERVALS.endDate;
}
