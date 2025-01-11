import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";

const Home = () => {
  const latestBooks = sampleBooks || []; // Ensure `sampleBooks` is defined

  if (!latestBooks.length) {
    return <p>No books available.</p>; // Fallback for empty books
  }

  return (
    <>
      <BookOverview {...latestBooks[0]} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
