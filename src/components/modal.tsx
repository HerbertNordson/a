import { useAppContext } from "@/context";
import { useState } from "react";

interface IModal {
  param: string;
  title: string;
  label: string;
  err: string;
}

export const Modal = ({ param, title, label, err }: IModal) => {
  const [error, setError] = useState(false);
  const { table, setTable, pdv, setPdv } = useAppContext();

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = event.target.inputValue.value;

    if (value) {
      setError(false);
      if (param === "table") {
        localStorage.setItem("table", value);
        return setTable(value);
      }

      localStorage.setItem("pdv", value);
      return setPdv(value);
    }
    setError(true);
    return;
  }

  return (
    <div className="fixed inset-0 bg-color-op z-10">
      <div className="flex justify-center item-center flex-col w-full h-full">
        <div className="m-auto w-4/5 flex flex-col gap-4 bg-card-bg p-4 rounded-xl">
          <header>
            <h1 className="text-center text-2xl font-bold">{title}</h1>
          </header>
          <main>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="inputValue">{label}</label>
              <input
                type="text"
                placeholder="Ex: 100"
                name="inputValue"
                className={`p-4 rounded-xl outline-offset-4 ${
                  error
                    ? "outline-error border border-error"
                    : "outline-primary-color border border-secundary-color"
                } `}
              />
              {error && <i className="text-error text-center">{err}</i>}
              <button
                type="submit"
                className="bg-primary-color uppercase w-full font-bold text-center p-6 rounded-2xl border-2 text-white bg-primary-color border-secundary-color"
              >
                Salvar
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};
