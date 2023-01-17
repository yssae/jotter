export interface Note {
  _id: string,
  notebookID : string,
  title: string,
  content: string,
  images?: [
    {
      name?: string,
      url: string,
    }
  ],
  createdAt?: Date,
  updatedAt?: Date,
}
