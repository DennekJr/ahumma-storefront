/**
 * Brand social profiles.
 *
 * The TikTok link is stored without the `?_r=` and `?_t=` parameters the app
 * appends when you share from it — those are share-session tokens tied to
 * whoever copied the link, and they expire. The canonical profile URL does not.
 */
export const SOCIALS = {
  instagram: "https://www.instagram.com/ahummabeauty",
  tiktok: "https://www.tiktok.com/@ahummabeauty",
} as const;
