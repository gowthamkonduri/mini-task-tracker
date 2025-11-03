// get all the categories from App.jsx, plus "All"
function FilterControls({ currentFilter, onFilterChange, categories }) {
  const filterCategories = ['All', ...categories];
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {filterCategories.map((category) => {
        const isActive = category === currentFilter;
        return (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            // changes styles based on whether it is active
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${isActive
                ? 'bg-nhs-blue text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
export default FilterControls;
