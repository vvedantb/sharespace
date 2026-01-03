import { getPresignedUrl } from "@/lib/actions/images";

export async function uploadToS3(file: File, folder: string = "items"): Promise<string> {
  const { uploadUrl, fileUrl } = await getPresignedUrl(file.name, file.type, folder);

  const response = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    mode: "cors",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`S3 upload failed: ${response.status} ${text}`);
  }

  return fileUrl;
}

export async function uploadMultipleToS3(files: File[], folder: string = "items"): Promise<string[]> {
  return Promise.all(files.map((file) => uploadToS3(file, folder)));
}
