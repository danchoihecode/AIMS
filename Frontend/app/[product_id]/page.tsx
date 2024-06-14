import { BookDTO, CDDTO, CartItemDTO, DVDDTO, LDDTO } from "@/api/DTO/CartItemDTO";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/table";
import Image from "next/image";

export default function ProductDetail() {
    const item: CartItemDTO = {
        productId: "1",
        title: "Oppenheimer",
        price: 100000,
        imageUrl: "/poster/anh2.png",
        quantity: 1,
        category: "DVD",
        year: 2021,
    };
    const dvd: DVDDTO = {
        id: 1,
        director: "HAIDOHONG",
        genre: "Documentary",
        language: "English",
        subtitles: "Vietnamese",
        studio: "HAIDOHONG",
        runtime: 120,

    }
    const cd: CDDTO = {
        id: 1,
        artist: "HAIDOHONG",
        genre: "Documentary",
        record_label: "HAIDOHONG",
        tracklist: "HAIDOHONG",
    }
    const book: BookDTO = {
        id: 1,
        author: "HAIDOHONG",
        genre: "Documentary",
        language: "English",
        number_of_pages: 120,
        publication_date: "2021",
        publisher: "HAIDOHONG",
    }
    const ld: LDDTO = {
        id: 1,
        artist: "HAIDOHONG",
        genre: "Documentary",
        record_label: "HAIDOHONG",
        tracklist: "HAIDOHONG",
    }

    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <div className="md:flex md:space-x-8 items-center space-y-8">
            <Image
                src={item.imageUrl}
                width={400}
                height={400}
                alt="product"
                className="m-auto md:m-0"
            />
            <div className="space-y-4 w-full">
                <h1 className="text-3xl font-bold ">{item.title}</h1>
                <h2 className="text-2xl font-semibold">
                    {formatter.format(item.price)}
                </h2>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                Category
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Year</TableCell>
                            <TableCell>{item.year}</TableCell>
                        </TableRow>
                        {dvd && <DVDRows dvd={dvd} /> }
                        {cd && <CDRows cd={cd} />}
                        {book && <BookRows book={book} />}
                        {ld && <CDRows cd={cd} />}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
} 
const DVDRows = ({dvd}: {dvd: DVDDTO}) => {
    return (
        <>
            <TableRow>
                <TableCell className="font-medium">Director</TableCell>
                <TableCell>{dvd.director}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Genre</TableCell>
                <TableCell>{dvd.genre}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Language</TableCell>
                <TableCell className="space-x-2">
                    <Badge>{dvd.language}</Badge>
                    <Badge variant="secondary">{dvd.subtitles}</Badge>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Studio</TableCell>
                <TableCell>{dvd.studio}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Duration</TableCell>
                <TableCell>{dvd.runtime} minutes</TableCell>
            </TableRow>
        </>
    );
};
const CDRows = ({cd}: {cd: CDDTO}) => {
    return (
        <>
            <TableRow>
                <TableCell className="font-medium">Artist</TableCell>
                <TableCell>{cd.artist}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Genre</TableCell>
                <TableCell>{cd.genre}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Record Label</TableCell>
                <TableCell>{cd.record_label}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Tracklist</TableCell>
                <TableCell>{cd.tracklist}</TableCell>
            </TableRow>
        </>
    );
}
const BookRows = ({book}: {book: BookDTO}) => {
    return (
        <>
            <TableRow>
                <TableCell className="font-medium">Author</TableCell>
                <TableCell>{book.author}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Genre</TableCell>
                <TableCell>{book.genre}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Language</TableCell>
                <TableCell>{book.language}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Number of Pages</TableCell>
                <TableCell>{book.number_of_pages}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Publication Date</TableCell>
                <TableCell>{book.publication_date}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Publisher</TableCell>
                <TableCell>{book.publisher}</TableCell>
            </TableRow>
        </>
    );
}