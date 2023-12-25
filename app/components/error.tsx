"use client";

import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function Fallback({ error }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="text-error">{error.message}</pre>
    </div>
  );
}

export default function Error({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
}
