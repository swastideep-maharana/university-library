"use client";

import { cn } from "@/lib/utils";
import React from "react";
import BookCoverSvg from "./BookCoverSvf";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor?: string;
  coverImage?: string;
  altText?: string;
}

const BookCover: React.FC<Props> = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
  altText = "Book cover image",
}) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300 rounded-sm overflow-hidden",
        variantStyles[variant],
        className
      )}
      style={{ backgroundColor: coverColor }}
      aria-label={altText}
    >
      {/* Book Side SVG */}
      <div className="absolute inset-0 z-0 flex items-center justify-center ">
        <BookCoverSvg coverColor={coverColor} />
      </div>

      {/* Book Cover Image */}
      <div
        className="absolute z-10"
        style={{
          left: "12%",
          width: "87.5%",
          height: "88%",
        }}
      >
        <img
          src={coverImage}
          alt={altText}
          className="w-full h-full object-cover rounded-sm"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/400x600.png";
            e.currentTarget.alt = "Fallback book cover image";
          }}
        />
      </div>
    </div>
  );
};

export default BookCover;
