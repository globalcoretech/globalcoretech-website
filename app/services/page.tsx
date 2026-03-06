import ServicesClient from "./ServicesClient";
import DepthLayer from "../components/animations/DepthLayer";

export default function ServicesPage() {
  return (
    <main className="relative bg-[#050b0b] overflow-hidden">

      {/* Entire page in depth layer */}
      <DepthLayer speed={0.15}>
        <ServicesClient />
      </DepthLayer>

    </main>
  );
}
