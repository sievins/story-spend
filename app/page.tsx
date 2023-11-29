import { SignOutButton } from "@clerk/nextjs";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignOutButton>
        <button className="btn btn-circle">
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
        </button>
      </SignOutButton>
    </main>
  );
}
