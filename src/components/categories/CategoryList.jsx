import CategoryCard from "./CategoryCard";

const CategoryList = ({ categories }) => {
  return (
    <div className="container mx-auto p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {categories.map((category) => (
        <CategoryCard
          key={category.title}
          title={category.title}
          image={category.image}
          linkName={category.linkName}
        />
      ))}
    </div>
  );
};

export default CategoryList;
