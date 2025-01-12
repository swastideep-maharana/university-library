import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
  try {
    const authParams = imagekit.getAuthenticationParameters();

    if (!authParams) {
      throw new Error("Failed to get authentication parameters from ImageKit");
    }

    return NextResponse.json(authParams);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to retrieve authentication parameters",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
