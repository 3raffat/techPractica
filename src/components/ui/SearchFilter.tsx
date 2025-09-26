// components/ui/SearchFilter.tsx
import { ChangeEvent } from "react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  filterOptions: string[];
  activeFilter: string;
  searchQuery: string;
}

const SearchFilter = ({
  onSearch,
  onFilterChange,
  filterOptions,
  activeFilter,
  searchQuery,
}: SearchFilterProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search sessions..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#42D5AE] focus:border-[#42D5AE] transition"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="w-full sm:w-60">
        <div className="relative w-full sm:w-60">
          <select
            value={activeFilter}
            onChange={handleFilterChange}
            className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#42D5AE] focus:border-[#42D5AE] transition"
          >
            <option value="all">All Categories</option>
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
