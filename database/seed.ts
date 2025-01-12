import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import ImageKit from "imagekit";
import { books } from "@/database/schema";
import dummyBooks from "../dummybooks.json";

// Load environment variables
config({ path: ".env.local" });

// Database connection setup
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

// ImageKit setup
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

// Function to upload images to ImageKit
const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });

    return response.filePath;
  } catch (error) {
    console.error(`Error uploading image to ImageKit for ${fileName}:`, error);
    return null; // Return null if upload fails
  }
};

// Seeder function to insert books into the database
const seed = async () => {
  console.log("Seeding data...");

  try {
    for (const book of dummyBooks) {
      const coverUrl = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      );
      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      );

      if (!coverUrl || !videoUrl) {
        console.error(`Skipping book ${book.title} due to upload failure.`);
        continue; // Skip the current book if upload fails
      }

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

// Run the seeding script
seed();
