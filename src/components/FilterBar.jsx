import { FiSearch, FiFilter } from 'react-icons/fi';

const FilterBar = ({ searchTerm, onSearchChange, sortOrder, onSortChange }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-wrap gap-4 items-center">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Pesquisar..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <FiFilter className="text-primary-600" />
        <select
          value={sortOrder}
          onChange={onSortChange}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;