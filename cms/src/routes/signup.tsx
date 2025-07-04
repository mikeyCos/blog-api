import { createFileRoute } from "@tanstack/react-router";
import SignUp from "../features/signup/SignUp";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});
