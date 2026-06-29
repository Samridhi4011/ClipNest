type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onAdd: () => void;
};

function SearchBar({ search, setSearch, onAdd }: SearchBarProps) {
  return (
    <div className="search-container">
      <input
        className="search-bar"
        placeholder="🔍 Search clipboard..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAdd();
          }
        }}
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