import "./App.css";
import SearchBar from "./components/SearchBar";
import ClipboardCard from "./components/ClipboardCard";

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1 className="title">ClipNest</h1>

        <p className="subtitle">
          Your smart clipboard manager.
        </p>

        <SearchBar />
        
        <ClipboardCard />
      </div>
    </div>
  );
}

export default App;