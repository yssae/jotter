export interface Notebook {
  _id: string,
  userId: string,
  title: string,
  cover: string,
  imageDescription?: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface NotebookCover {
  name: string,
  thumbnail: string,
  src: string,
  alt: string
}

export interface NewNotebook {
  title: string,
  cover: string,
  imageDescription?: string,
  _id?: string,
  userId?: string,
  createdAt?: Date,
  updatedAt?: Date
}
