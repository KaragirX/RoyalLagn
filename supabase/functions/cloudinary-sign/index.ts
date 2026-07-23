import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function sha1(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-1", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const authHeader = request.headers.get("Authorization") ?? "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Authentication required");

    const {
      vendorId,
      albumId,
      resourceType = "image",
      mimeType = "",
      fileSize = 0,
      batchSize = 1,
    } = await request.json();
    const kind = resourceType === "video" ? "video" : "image";
    const allowedImages = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);
    const allowedVideos = new Set(["video/mp4", "video/quicktime", "video/webm"]);
    const allowedTypes = kind === "video" ? allowedVideos : allowedImages;
    const maxBytes = kind === "video" ? 80 * 1024 * 1024 : 15 * 1024 * 1024;
    if (!allowedTypes.has(String(mimeType).toLowerCase())) throw new Error("Unsupported portfolio file type");
    if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > maxBytes) throw new Error("Portfolio file size is not allowed");
    if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > 25) throw new Error("Invalid upload batch");

    const { data: vendor } = await supabase
      .from("vendors").select("id").eq("id", vendorId).eq("profile_id", user.id).maybeSingle();
    const { data: album } = await supabase
      .from("vendor_portfolio_albums").select("id,media_count").eq("id", albumId).eq("vendor_id", vendorId).maybeSingle();
    if (!vendor || !album) throw new Error("Vendor album not found");
    const { count, error: countError } = await supabase
      .from("vendor_portfolio_media").select("id", { count: "exact", head: true }).eq("album_id", albumId);
    if (countError) throw countError;
    const currentCount = Math.max(album.media_count ?? 0, count ?? 0);
    if (currentCount + batchSize > 25) throw new Error("Album media limit reached");

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = `royallagn/vendors/${vendorId}/albums/${albumId}`;
    const assetId = crypto.randomUUID();
    const params = {
      folder,
      overwrite: "false",
      public_id: assetId,
      timestamp,
      unique_filename: "false",
    };
    const canonical = Object.entries(params).sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`).join("&");
    const apiSecret = Deno.env.get("CLOUDINARY_API_SECRET");
    const apiKey = Deno.env.get("CLOUDINARY_API_KEY");
    const cloudName = Deno.env.get("CLOUDINARY_CLOUD_NAME");
    if (!apiSecret || !apiKey || !cloudName) throw new Error("Cloudinary server configuration is missing");

    return Response.json({
      ...params,
      signature: await sha1(`${canonical}${apiSecret}`),
      apiKey,
      cloudName,
      resourceType: kind,
      remainingCapacity: 25 - currentCount,
    }, { headers: cors });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to sign upload" },
      { status: 400, headers: cors });
  }
});
