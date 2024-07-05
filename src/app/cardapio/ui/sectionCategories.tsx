import { CategoriesMap } from "@/components/categoriesMap";
import { SectionTitle } from "@/components/sectionTitle";

export const SectionCategories = () => {
  return (
    <section className="pl-6">
      <SectionTitle size="text-2xl" label="Grupo de produtos" />
      <CategoriesMap/>
    </section>
  );
};
