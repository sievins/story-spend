import DOMPurify from "isomorphic-dompurify";

export default function domPurify(html: string | undefined) {
  if (html === undefined) return undefined;
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}
