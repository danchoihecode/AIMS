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
export interface Product {
    id: number;
    title: string;
    price: number;
    qtyInStock: number;
    weight: number;
    image: string;
    year: number;
    category: string;
    rushOrderEligible: boolean;
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
    recordLabel: string;
    tracklist: string;
}
export interface BookDTO {
    id: number;
    author: string;
    genre: string;
    language: string;
    numberOfPages: number;
    publicationDate: string;
    publisher: string;
}
export interface LPDTO {
    id: number;
    artist: string;
    genre: string;
    recordLabel: string;
    tracklist: string;
}