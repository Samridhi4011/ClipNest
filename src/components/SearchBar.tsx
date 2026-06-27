type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onAdd: () => void;
};

function SearchBar({ search, setSearch, onAdd }: SearchBarProps) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="🔍 Search clipboard..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="add-button"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
}

export default SearchBar;