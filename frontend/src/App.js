import Login from "./page.js";
import Profile from "./profile.js";
import Subgred from "./subgred.js";
import Allgred from "./allgred.js";
import Gredpage from "./gredpage.js";
import Statgred from "./statpage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subgreds" element={<Subgred />} />
        <Route path="/allgreds" element={<Allgred />} />
        <Route path="/allgreds/:val" element={<Gredpage />} />
        <Route path="/subgreds/:val" element={<Statgred />} />
      </Routes>
    </Router>
  );
}

export default App;
