import { DishMap } from "@/components/dishMap";
import { SectionTitle } from "@/components/sectionTitle";

export const SectionDish = () => {
  return (
    <section className="px-6">
      <SectionTitle size="text-2xl" label="Opções" />
      <DishMap />
    </section>
  );
};
