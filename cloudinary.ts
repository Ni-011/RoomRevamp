import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with server-side environment variables
// Don't use NEXT_PUBLIC_ prefix for server-side secrets
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add validation to check if configuration is set
const isConfigured =
  cloudinary.config().cloud_name &&
  cloudinary.config().api_key &&
  cloudinary.config().api_secret;

if (!isConfigured) {
  console.error(
    "Cloudinary configuration is incomplete. Please check your environment variables."
  );
}

export default cloudinary;
