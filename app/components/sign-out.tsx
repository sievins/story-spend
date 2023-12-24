"use-client";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "@/actions";

export default function SignOut() {
  return (
    <button onClick={() => signOut()} className="btn btn-circle">
      <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
    </button>
  );
}
