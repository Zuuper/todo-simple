export interface Todo {
  id: number,
  title: string,
  label: string,
  status: 'active' | 'non active'
  createdAt: string,
  updatedAt:string
}