import { ITitles } from "@/utils/interfaces";

export const Title = ({ label, color, size }: ITitles) => {
  return (
    <h1 className={`uppercase font-bold ${size} ${color}`}>
      {label}
    </h1>
  );
};
