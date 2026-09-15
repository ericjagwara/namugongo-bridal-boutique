import { createFileRoute, redirect } from "@tanstack/react-router";

// /shop simply opens the collections page.
export const Route = createFileRoute("/shop/")({
  beforeLoad: () => {
    throw redirect({ to: "/collections", replace: true });
  },
});
