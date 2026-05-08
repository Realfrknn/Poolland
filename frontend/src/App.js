import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { Toaster } from "sonner";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("lenis");
    return () => document.documentElement.classList.remove("lenis");
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors closeButton theme="light" />
    </div>
  );
}

export default App;
