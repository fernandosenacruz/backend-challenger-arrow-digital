type OrderBy = 'comments' | 'ups';

export interface QueryThread {
  initialDate: string;
  finalDate: string;
  orderBy?: OrderBy;
  page?: number;
  limit?: number;
}
