import { useState } from "react";
import clipboardData from "./data/clipboardData";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ClipboardCard from "./components/ClipboardCard";

function App() {
  const [search, setSearch] = useState("");
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
        />
        {clipboardData
          .filter((item) =>
            item.text.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <ClipboardCard
              key={item.id}
              text={item.text}
              time={item.time}
            />
          ))}

        
      </div>
    </div>
  );
}

export default App;