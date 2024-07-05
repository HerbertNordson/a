import { IButton } from "@/utils/interfaces";
import Link from "next/link";

export const Ancor = ({ color, borderColor, label, url, bgColor }: IButton) => {
  return (
    <Link
      href={url}
      className={`bg-primary-color uppercase w-full font-bold text-center p-6 rounded-2xl border-2 ${borderColor}  ${bgColor} ${color}`}
    >
      {label}
    </Link>
  );
};
