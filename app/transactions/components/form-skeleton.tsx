export default function FormSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-11 w-full max-w-sm mt-9">
        <div className="skeleton h-12"></div>
        <div className="skeleton h-12"></div>
        <div className="skeleton h-12"></div>
        <div className="skeleton h-12"></div>
      </div>
      <div className="h-6" />
      <div className="skeleton h-12 w-44"></div>
    </div>
  );
}
