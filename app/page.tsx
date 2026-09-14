import { Cierre } from "@/components/Cierre";
import { Info } from "@/components/Info";
import { Itinerario } from "@/components/Itinerario";
import { Portada } from "@/components/Portada";

export default function Home() {
  return (
    <>
      <Portada />
      <main>
        <Itinerario />
        <Info />
      </main>
      <Cierre />
    </>
  );
}
