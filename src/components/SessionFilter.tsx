import SearchFilter from "./ui/SearchFilter";

const SessionFilter = ({
  systemName,
  activeFilter,
  searchQuery,
  onSearch,
  onFilterChange,
}: {
  systemName: string[];
  activeFilter: string;
  searchQuery: string;
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
}) => {
  return (
    <SearchFilter
      onSearch={onSearch}
      onFilterChange={onFilterChange}
      filterOptions={systemName}
      activeFilter={activeFilter}
      searchQuery={searchQuery}
    />
  );
};

export default SessionFilter;
