export interface PaymentsFilters {
  orderBy: OrderBy;
  sort: string;
}

export interface OrderBy {
  created_at: string;
}
