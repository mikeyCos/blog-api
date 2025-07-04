import { createFileRoute } from "@tanstack/react-router";
import Faq from "../pages/faq/Faq";

export const Route = createFileRoute("/faq")({
  component: Faq,
});
