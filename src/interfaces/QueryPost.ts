type OrderBy = 'comments' | 'ups';

export interface QueryPost {
  initialDate: string;
  finalDate: string;
  orderBy?: OrderBy;
  page?: number;
  limit?: number;
}