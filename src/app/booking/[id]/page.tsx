import services from "@/data/services.json";
import BookingPage from "./BookingContent";

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export default function Page() {
  return <BookingPage />;
}
