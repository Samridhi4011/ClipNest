import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import clipboardData from "./data/clipboardData";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ClipboardCard from "./components/ClipboardCard";
import { formatTime } from "./utils/formatTime";
import logo from "./assets/logo.png";

type ClipboardItem = {
  id: number;
  text: string;
  createdAt: number;
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
  const [showWelcome, setShowWelcome] = useState(false);
  const [editText, setEditText] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedButton, setSelectedButton] = useState<"cancel" | "delete">("cancel");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setShowWelcome(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "clipboardItems",
      JSON.stringify(items)
    );
  }, [items]);


  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);


  useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      setDeleteId(null);
    }
  }

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };

}, []);

    useEffect(() => {
  if (deleteId === null) return;

  const handleKeyDown = (e: KeyboardEvent) => {

    if (e.key === "ArrowRight") {
      setSelectedButton("delete");
    }

    if (e.key === "ArrowLeft") {
      setSelectedButton("cancel");
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (selectedButton === "cancel") {
        setDeleteId(null);
      } else {
        handleDelete(deleteId);
        
      }

    }

  };

  window.addEventListener("keydown", handleKeyDown);

  return () => window.removeEventListener("keydown", handleKeyDown);

}, [deleteId, selectedButton]);

  function handleAdd() {
    if (search.trim() === "") return;
    const newItem: ClipboardItem = {
      id: Date.now(),
      text: search,
      createdAt: Date.now(),
      favorite: false,
    };
    setItems([newItem, ...items]);
    setSearch("");
    toast.success("Clipboard added!");
  }

function handleDelete(id: number) {
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) return;

  const itemToDelete = items[index];

  // Remove the item
  setItems((prevItems) =>
    prevItems.filter((item) => item.id !== id)
  );

  // Close delete modal
  setDeleteId(null);

  // Show Undo toast
  toast(
  (t) => (
    <div className="undo-toast">
      <span>🗑 Clipboard deleted</span>

      <button
        className="undo-btn"
        onClick={() => {
          setItems((prevItems) => {
            const updated = [...prevItems];

            updated.splice(index, 0, itemToDelete);

            return updated;
          });

          toast.dismiss(t.id);
          toast.success("Clipboard restored!");
        }}
      >
        Undo
      </button>
    </div>
  ),
  {
    duration: 5000,
  }
);
}

  function handleFavorite(id: number) {
    const clickedItem = items.find((item) => item.id === id);

    if (!clickedItem) return;

    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, favorite: !item.favorite }
          : item
      )
    );

    if (clickedItem.favorite) {
      toast("Removed from favorites ⭐");
    } else {
      toast.success("Added to favorites ⭐");
    }
  }

  function handleCancel() {
    setEditingId(null);
    setEditText("");
  }

  function handleWelcome() {
    localStorage.setItem("hasVisited", "true");
    setShowWelcome(false);
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
    toast.success("Clipboard updated!");
}

  function handleCopy(id: number, text: string) {
    navigator.clipboard.writeText(text);

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);

    toast.success("Copied to clipboard!");
  }
  const filteredItems = items
  .filter((item) => {
    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFavorite =
      !showFavorites || item.favorite;

    return matchesSearch && matchesFavorite;
  })
  .sort((a, b) => Number(b.favorite) - Number(a.favorite));

  const favoriteCount = items.filter(
    (item) => item.favorite
  ).length;

  const isSearching = search.trim() !== "";

  return (
  <div className={`app ${theme}`}>

    {/* Welcome Popup */}
    {showWelcome && (
      <div className="welcome-overlay">
        <div className="welcome-box">
          <h1>      📋

            Welcome to ClipNest</h1>

          <p>
            A modern clipboard manager designed for productivity.
          </p>

          <div className="welcome-features">
            <div>✓ Save clipboard history</div>
            <div>✓ Mark favorites</div>
            <div>✓ Edit snippets</div>
            <div>✓ Copy instantly</div>
          </div>

          <button
            className="welcome-btn"
            onClick={handleWelcome}
          >
            Get Started
          </button>
        </div>
      </div>
    )}

    {/* Delete Confirmation Modal */}
    {deleteId !== null && (
      <div
        className="delete-modal"
        onClick={() => setDeleteId(null)}
      >
        <div
          className="delete-box"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Delete this clipboard?</h3>

          <p>This action cannot be undone.</p>

          <div className="delete-buttons">
            <button
              className={`cancel-btn ${
                selectedButton === "cancel" ? "active-btn" : ""
              }`}
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </button>

            <button
              className={`confirm-delete-btn ${
                selectedButton === "delete" ? "active-btn" : ""
              }`}
              onClick={() => handleDelete(deleteId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Main App */}
    <div className="container">
      <div className="header">
        <img
          src={logo}
          alt="ClipNest Logo"
          className="logo"
        />

        <div>
          <h1 className="title">ClipNest</h1>

          <p className="subtitle">
            Your smart clipboard manager.
          </p>
      </div>

        <button
          className="theme-btn"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        
    </div>

    
    
      <SearchBar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
      />
      <div className="filter-buttons">
        <button
          className={!showFavorites ? "active-filter" : ""}
          onClick={() => setShowFavorites(false)}
        >
          All ({items.length})
        </button>

        <button
          className={showFavorites ? "active-filter" : ""}
          onClick={() => setShowFavorites(true)}
        >
          ★ Favorites ({favoriteCount})
        </button>
      </div>
      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            {isSearching
              ? "🔍"
              : showFavorites
              ? "⭐"
              : "📋"}
          </div>

          <h2>
            {isSearching
              ? "No results found"
              : showFavorites
              ? "No favorite clipboard items"
              : "No clipboard items yet."}
          </h2>

          <p>
            {isSearching
              ? "Try a different keyword."
              : showFavorites
              ? "Mark important snippets as favorites to access them quickly."
              : "Start by typing in the search box above!"}
          </p>
        </div>
      ) : (
        filteredItems.map((item) => (
          <ClipboardCard
            key={item.id}
            text={item.text}
            search={search}
            time={formatTime(item.createdAt)}
            createdAt={item.createdAt}
            favorite={item.favorite}
            isCopied={copiedId === item.id}
            isEditing={editingId === item.id}
            editText={editText}
            setEditText={setEditText}
            onFavorite={() => handleFavorite(item.id)}
            onEdit={() => handleEdit(item.id)}
            onSave={() => handleSave(item.id)}
            onCancel={handleCancel}
            onCopy={() => handleCopy(item.id, item.text)}
            onDelete={() => {
              setDeleteId(item.id);
              setSelectedButton("delete");
            }}
          />
        ))
      )}
    </div>
  </div>
);
}
export default App;