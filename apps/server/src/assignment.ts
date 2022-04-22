export type Assignment<T> =
  | { assigned: false }
  | { assigned: true; assignment: T };

export const notAssigned = <T>(): Assignment<T> => ({ assigned: false });

export const assigned = <T>(assignment: T): Assignment<T> => ({
  assigned: true,
  assignment,
});
