import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";

// Book interface definition
interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string; // Required property
  coverUrl: string; // Required property
  video: string;
  summary: string;
}

const Page: React.FC = () => {
  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Logout Button */}
      <Button onClick={handleSignOut} className="mb-10">
        Logout
      </Button>

      {/* Book List */}
      <BookList title="Borrowed Books" books={sampleBooks} />
    </div>
  );
};

export default Page;
