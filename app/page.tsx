import { SignOutButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignOutButton>
        <button className="btn btn-primary">Sign out</button>
      </SignOutButton>
    </main>
  );
}
