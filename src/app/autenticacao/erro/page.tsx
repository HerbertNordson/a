'use client'

import { Ancor } from "@/components/ancor";
import { Title } from "@/components/title";
import { useAppContext } from "@/context";

export default function Error() {
  const { error } = useAppContext();

  return (
    <>
      <Title size="text-3xl" label="Aguativa Resort" color="text-white" />
      <section className="h-full flex flex-col justify-center">
        <p className="uppercase text-white font-bold text-center mb-7">
          {error}
        </p>
        <Ancor
          label="Ir para início"
          url="/cardapio"
          bgColor="bg-white"
          color="text-error"
          borderColor="border-error"
        />
      </section>
    </>
  );
}
