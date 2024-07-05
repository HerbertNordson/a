"use client";
import { Header } from "@/components/header";
import { SectionCategories, SectionDish } from "./ui";
import { Footer } from "@/components/footer";
import { useAppContext } from "@/context";
import { Modal } from "@/components/modal";
import { useEffect } from "react";
import { Loading } from "@/components/loading";

export default function Menu() {
  const { table, pdv, loading } = useAppContext();

  const hasTableAndPdv = table && pdv;

  return (
    <div className="h-full  pb-32">
      <Header />
      {hasTableAndPdv && (
        <main className="w-full">
          <SectionCategories />
          {loading ? <Loading /> : <SectionDish />}
        </main>
      )}

      <Footer url="/carrinho" label="Revisar" />

      {!table && (
        <Modal
          title="Olá, informe o número da sua mesa"
          label="Nº da mesa:"
          err="Insira o número da sua mesa."
          param="table"
        />
      )}
      {!pdv && (
        <Modal
          title="Olá, informe o número do seu PDV. Caso você não possua este número solicite na recepção."
          label="Nº do PDV:"
          err="Insira o número do seu PDV."
          param="pdv"
        />
      )}
    </div>
  );
}
