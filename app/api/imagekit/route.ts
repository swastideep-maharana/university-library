import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const uploadImageToImageKit = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    try {
      const { file } = req.body; // Expecting base64 or URL of the file, or a file input form

      if (!file) {
        return res.status(400).json({ error: "File is required" });
      }

      // Check if file is a valid string or Blob (base64, URL, or file object)
      if (typeof file === "string" || file instanceof Blob) {
        const formData = new FormData();
        formData.append("file", file); // Now it's safe to append
        formData.append(
          "publicKey",
          process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""
        );
        formData.append("folder", "/uploads"); // Optional: specify folder in ImageKit

        // Authenticate using private key in the Authorization header (Base64 encoding)
        const headers = {
          Authorization: `Basic ${Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY || "").toString("base64")}`,
        };

        const response = await axios.post(
          "https://api.imagekit.io/v1/files/upload",
          formData,
          {
            headers: {
              ...headers,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        res.status(200).json(response.data);
      } else {
        return res.status(400).json({ error: "Invalid file format" });
      }
    } catch (error) {
      console.error("Error uploading image to ImageKit:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default uploadImageToImageKit;
