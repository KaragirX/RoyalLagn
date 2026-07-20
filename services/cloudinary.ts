import * as ImagePicker from "expo-image-picker";

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export type CloudinaryErrorCode =
  | "CONFIGURATION_ERROR"
  | "PERMISSION_DENIED"
  | "NETWORK_ERROR"
  | "UPLOAD_ERROR"
  | "PICKER_ERROR";

export class CloudinaryError extends Error {
  constructor(
    message: string,
    public readonly code: CloudinaryErrorCode,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "CloudinaryError";
  }
}

export type PickImageOptions = {
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
};

function getUploadUrl(): string {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new CloudinaryError(
      "Cloudinary is not configured. Set EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME and EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.",
      "CONFIGURATION_ERROR"
    );
  }

  return `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
}

/**
 * Opens the device image library. A null result means the user cancelled.
 */
export async function pickImage(
  options: PickImageOptions = {}
): Promise<ImagePicker.ImagePickerAsset | null> {
  try {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      throw new CloudinaryError(
        "Photo library permission is required to select an image.",
        "PERMISSION_DENIED"
      );
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: options.allowsEditing ?? false,
      aspect: options.aspect,
      quality: options.quality ?? 0.9,
    });

    if (result.canceled || !result.assets.length) {
      return null;
    }

    return result.assets[0];
  } catch (error) {
    if (error instanceof CloudinaryError) {
      throw error;
    }

    throw new CloudinaryError(
      "Unable to open the image library.",
      "PICKER_ERROR",
      error
    );
  }
}

/**
 * Uploads one local image with Cloudinary's unsigned upload preset.
 * Resolves with the HTTPS URL of the uploaded image.
 */
export async function uploadImage(
  image: Pick<ImagePicker.ImagePickerAsset, "uri" | "fileName" | "mimeType">
): Promise<string> {
  const formData = new FormData();
  const fileName = image.fileName ?? `image-${Date.now()}.jpg`;
  const mimeType = image.mimeType ?? "image/jpeg";

  formData.append(
    "file",
    {
      uri: image.uri,
      name: fileName,
      type: mimeType,
    } as unknown as Blob
  );
  formData.append("upload_preset", UPLOAD_PRESET ?? "");

  let response: Response;

  try {
    response = await fetch(getUploadUrl(), {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    throw new CloudinaryError(
      "Network error while uploading the image. Check your connection and try again.",
      "NETWORK_ERROR",
      error
    );
  }

  let payload: {
    secure_url?: string;
    error?: { message?: string };
  };

  try {
    payload = await response.json();
  } catch (error) {
    throw new CloudinaryError(
      "Cloudinary returned an invalid response.",
      "UPLOAD_ERROR",
      error
    );
  }

  if (!response.ok || !payload.secure_url) {
    throw new CloudinaryError(
      payload.error?.message ?? "Cloudinary image upload failed.",
      "UPLOAD_ERROR"
    );
  }

  return payload.secure_url;
}

/**
 * Convenience helper for the common select-and-upload flow.
 * Resolves with null when selection is cancelled, otherwise the Cloudinary URL.
 */
export async function pickAndUploadImage(
  options?: PickImageOptions
): Promise<string | null> {
  const image = await pickImage(options);
  return image ? uploadImage(image) : null;
}
