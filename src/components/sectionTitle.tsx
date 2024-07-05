import { ITitles } from "@/utils/interfaces";

export const SectionTitle = ({ label, color, size }: ITitles) => {
  return <h2 className={`${size} w-full my-4 mt-2 ${color}`}>{label}</h2>;
};
