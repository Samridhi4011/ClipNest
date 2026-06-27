import { useState, useEffect } from "react";
import clipboardData from "./data/clipboardData";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ClipboardCard from "./components/ClipboardCard";

type ClipboardItem = {
  id: number;
  text: string;
  time: string;
};

function App() {
  const [items, setItems] = useState<ClipboardItem[]>(() => {
    const saved = localStorage.getItem("clipboardItems");

    return saved
      ? (JSON.parse(saved) as ClipboardItem[])
      : clipboardData;
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "clipboardItems",
      JSON.stringify(items)
    );
  }, [items]);

  function handleAdd() {
    if (search.trim() === "") return;

    const newItem: ClipboardItem = {
      id: Date.now(),
      text: search,
      time: "Just now",
    };

    setItems([newItem, ...items]);
    setSearch("");
  }

  function handleDelete(id: number) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">ClipNest</h1>

        <p className="subtitle">
          Your smart clipboard manager.
        </p>

        <SearchBar
          search={search}
          setSearch={setSearch}
          onAdd={handleAdd}
        />

        {items
          .filter((item) =>
            item.text.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <ClipboardCard
              key={item.id}
              text={item.text}
              time={item.time}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
      </div>
    </div>
  );
}

export default App;