import { Suspense } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div>{children}</div>
    </Suspense>
  );
}
