import { Category } from "@prisma/client";

const CategoryRow = ({ category }: { category: Category }) => {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  );
};

export default CategoryRow;
