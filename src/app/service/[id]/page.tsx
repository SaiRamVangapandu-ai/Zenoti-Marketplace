import services from "@/data/services.json";
import ServiceDetail from "./ServiceDetail";

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export default function Page() {
  return <ServiceDetail />;
}
