import { Table } from "./table";
import { Title } from "./title";

export const Header = () => {
  return (
    <header className="flex gap-2 justify-between items-center p-6 pt-8 w-full">
      <div>
        <Title
          size="text-2xl"
          label="Aguativa resort"
          color="text-primary-color"
        />
        <p className="text-sm text-subtitle">
          Selecione as opções desejadas e ao fim, escaneie a sua pulseira para
          enviar o seu pedido
        </p>
      </div>
      <Table />
    </header>
  );
};
