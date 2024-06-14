export interface CartItemDTO {
    productId: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
    category: string;
    year: number;
    isRushDelivery?: boolean;
}
export interface DVDDTO {
    id: number;
    director: string;
    genre: string;
    language: string;
    subtitles: string;
    studio: string;
    runtime: number;
}
export interface CDDTO {
    id: number;
    artist: string;
    genre: string;
    record_label: string;
    tracklist: string;
}
export interface BookDTO {
    id: number;
    author: string;
    genre: string;
    language: string;
    number_of_pages: number;
    publication_date: string;
    publisher: string;
}
export interface LDDTO {
    id: number;
    artist: string;
    genre: string;
    record_label: string;
    tracklist: string;
}