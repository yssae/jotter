export interface Note {
  _id: string,
  notebookID : string,
  title: string,
  delta?: any,
  content: string,
  background?: string,
  bookmarked?: boolean,
  images?: [
    {
      name?: string,
      url: string,
    }
  ],
  createdAt?: Date,
  updatedAt?: Date,
}
