import { useAppContext } from "@/context";

export const Table = () => {
  const { table } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4 bg-primary-color rounded-lg">
      <p className="text-white text-center">Mesa</p>
      <span className="text-white text-center font-bold text-2xl">{table}</span>
    </div>
  );
};
