import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound({
  message,
  slug,
}: {
  message: string;
  slug: string;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10" />
      <h2>Not Found</h2>
      <p>{message}</p>
      <Link href={slug} className="btn btn-primary">
        Go Back
      </Link>
    </div>
  );
}
