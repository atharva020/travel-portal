import "./App.css";

import Hero from "./components/hero/Hero";
import Guides from "./components/guides/Guides";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Guides />
    </div>
  );
}

export default App;
