import { JSX } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (row: T) => JSX.Element;
};

export interface Employee {
  id?: number; // optional for "add" scenario
  username: string;
  mobile: string;
  email: string;
  aadhar: string;
  college: string;
  branch: string;
  passedOutYear: string;
  hallTicket: string;
}

