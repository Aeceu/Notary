import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Bookmarks from "./pages/Bookmarks";
import Library from "./pages/Library";
import Completed from "./pages/Completed";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import NoteModal from "./pages/NoteModal";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ProtectedRoutes, PublicRoutes } from "./components/ProtectedRoute";
import Pinned from "./pages/Pinned";

function App() {
  axios.defaults.baseURL = "http://localhost:4200";
  axios.defaults.withCredentials = true;
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="pins" element={<Pinned />} />
          <Route path="library" element={<Library />} />
          <Route path="completed" element={<Completed />} />
          <Route path="note/:id" element={<NoteModal />} />
        </Route>
      </Route>

      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
