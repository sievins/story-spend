import NotFoundBase from "@/app/components/not-found";

export default function NotFound() {
  return (
    <NotFoundBase
      message="Could not find the requested transaction"
      slug="/transactions"
    />
  );
}
