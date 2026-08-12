import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllNotes from "./pages/AllNotes";
import CreateNotes from "./pages/CreateNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllNotes />} />
        <Route path="/create" element={<CreateNotes />} />
        <Route path="/edit/:id" element={<CreateNotes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
