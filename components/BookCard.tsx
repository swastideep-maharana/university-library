import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const BookCard = ({
  id,
  title,
  genre,
  color,
  cover,
  isLoanedBook = false,
}: Book) => (
  <li className={cn("book-card", isLoanedBook && "xs:w-52 w-full")}>
    <Link
      href={`/books/${id}`}
      className={cn("flex flex-col items-center", isLoanedBook && "w-full")}
    >
      {/* Book Cover */}
      <BookCover coverColor={color} coverImage={cover} />

      {/* Book Info */}
      <div
        className={cn(
          "mt-4 text-center",
          !isLoanedBook && "xs:max-w-40 max-w-28"
        )}
      >
        <p className="book-title truncate">{title}</p>
        <p className="book-genre text-sm text-light-200">{genre}</p>
      </div>

      {/* Loaned Book Section */}
      {isLoanedBook && (
        <div className="mt-4 w-full text-center">
          <div className="book-loaned flex items-center justify-between gap-2 text-sm text-light-100">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={18}
              height={18}
              className="object-contain"
            />
            <p>11 days left to return</p>
          </div>

          <Button className="book-btn mt-2 text-dark-800">Download receipt</Button>
        </div>
      )}
    </Link>
  </li>
);

export default BookCard;
