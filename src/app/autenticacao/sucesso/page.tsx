import { Ancor } from "@/components/ancor";
import { Title } from "@/components/title";

export default function Success() {
  return (
    <>
      <Title size="text-3xl" label="Aguativa Resort" color="text-white" />
      <section className="h-full flex flex-col justify-center">
        <p className="uppercase text-white font-bold text-center mb-7">
          Pedido enviado com sucesso!
        </p>
        <Ancor
          label="Ir para início"
          url="/cardapio"
          bgColor="bg-white"
          color="text-primary-color"
          borderColor="border-primary-color"
        />
      </section>
    </>
  );
}
