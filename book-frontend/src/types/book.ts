export interface Book {
  id: string;
  name: string;
  author: string;
  publicationDate: string;
  description: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookDTO {
  name: string;
  author: string;
  publicationDate: string;
  description: string;
  coverImage?: File;
}

export interface UpdateBookDTO extends Partial<CreateBookDTO> {}
