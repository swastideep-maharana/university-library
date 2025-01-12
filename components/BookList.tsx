import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  listClassName?: string; // Optional className for the list
}

const BookList = ({
  title,
  books,
  containerClassName = "",
  listClassName = "",
}: Props) => {
  return (
    <section className={containerClassName} aria-label={`Section for ${title}`}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className={`book-list ${listClassName}`}>
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
