export interface Issue {
  _id?: string;
  project: string;
  type: string;
  status: string;
  priority: string;
  summary: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
