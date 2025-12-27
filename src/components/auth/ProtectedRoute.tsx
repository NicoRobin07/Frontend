import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

// TEMP: bypass authentication so app can render
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  return <>{children}</>;
}
