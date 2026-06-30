import { useRef } from "react";
type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onAdd: () => void;
};

function SearchBar({ search, setSearch, onAdd }: SearchBarProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="search-container">
      <textarea
        ref={textAreaRef}
        className="search-bar"
        placeholder="🔍 Search clipboard..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);

          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            onAdd();

            if (textAreaRef.current) {
              textAreaRef.current.style.height = "auto";
            }
          }
        }}
      />

      <button
        className="add-button"
        onClick={() => {
          onAdd();

          if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
          }
        }}
      >
        Add
      </button>
    </div>
  );
}

export default SearchBar;