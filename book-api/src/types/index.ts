export interface Book {
    id: string;
    name: string;
    author: string;
    publicationDate: Date;
    description: string;
    coverImage: string;
}

export interface APIResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}