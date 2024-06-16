import { BookDTO, CDDTO, DVDDTO, LPDTO } from "@/api/DTO/CartItemDTO";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

export const DVDRows = ({ dvd }: { dvd: DVDDTO }) => {
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
                    {dvd.subtitles &&
                        dvd.subtitles
                            .split(",")
                            .map((sub) => (
                                <Badge variant="secondary">{sub}</Badge>
                            ))}
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
export const CDRows = ({ cd }: { cd: CDDTO }) => {
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
                <TableCell>{cd.recordLabel}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Tracklist</TableCell>
                <TableCell>{cd.tracklist}</TableCell>
            </TableRow>
        </>
    );
};
export const BookRows = ({ book }: { book: BookDTO }) => {
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
                <TableCell>{book.numberOfPages}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Publication Date</TableCell>
                <TableCell>
                    {new Date(book.publicationDate).toLocaleDateString("en-US")}
                </TableCell>{" "}
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Publisher</TableCell>
                <TableCell>{book.publisher}</TableCell>
            </TableRow>
        </>
    );
};
export const LPRows = ({ lp }: { lp: LPDTO }) => {
    return (
        <>
            <TableRow>
                <TableCell className="font-medium">Artist</TableCell>
                <TableCell>{lp.artist}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Genre</TableCell>
                <TableCell>{lp.genre}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Record Label</TableCell>
                <TableCell>{lp.recordLabel}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Tracklist</TableCell>
                <TableCell>{lp.tracklist}</TableCell>
            </TableRow>
        </>
    );
};
