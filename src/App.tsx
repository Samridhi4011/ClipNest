import { useState, useEffect } from "react";
import clipboardData from "./data/clipboardData";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ClipboardCard from "./components/ClipboardCard";

type ClipboardItem = {
  id: number;
  text: string;
  time: string;
  favorite: boolean;
};

function App() {
  const [items, setItems] = useState<ClipboardItem[]>(() => {
    const saved = localStorage.getItem("clipboardItems");

    return saved
      ? (JSON.parse(saved) as ClipboardItem[])
      : clipboardData;
  });

  const [search, setSearch] = useState("");
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

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
      favorite: false,
    };

    setItems([newItem, ...items]);
    setSearch("");
  }

  function handleDelete(id: number) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleFavorite(id: number) {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, favorite: !item.favorite }
          : item
      )
    );
  }

  function handleCancel() {
    setEditingId(null);
    setEditText("");
  }

  function handleEdit(id: number) {
    const item = items.find((item) => item.id === id);

    if (!item) return;

    setEditingId(id);
    setEditText(item.text);
  }
  function handleSave(id: number) {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, text: editText }
          : item
      )
    );

    setEditingId(null);
    setEditText("");
}

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
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
          .sort((a, b) => Number(b.favorite) - Number(a.favorite))
          .map((item) => (
            <ClipboardCard
              key={item.id}
              text={item.text}
              time={item.time}
              favorite={item.favorite}
              isEditing={editingId === item.id}
              editText={editText}
              setEditText={setEditText}
              onFavorite={() => handleFavorite(item.id)}
              onCopy={() => handleCopy(item.text)}
              onDelete={() => handleDelete(item.id)}
              onEdit={() => handleEdit(item.id)}
              onSave={() => handleSave(item.id)}
            />
          ))}
      </div>
    </div>
  );
}

export default App;