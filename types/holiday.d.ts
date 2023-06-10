export interface IHoliday {
  counties: string | null;
  countryCode: string;
  date: string;
  fixed: true;
  global: true;
  launchYear: string | null;
  localName: string;
  name: string;
  types: string[];
}
