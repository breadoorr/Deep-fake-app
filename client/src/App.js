import logo from './logo.svg';
import './App.css';
import { Landing } from './pages/Landing';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import {Profile} from "./pages/Profile";
import {Leaderboard} from "./pages/Leaderboard";
import {Settings} from "./pages/Settings";
import {Menu} from "./pages/Menu";
import {Game} from "./pages/Game";

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leader" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/game" element={<Game />} />

          {/*<Route path="contact" element={<Contact />} />*/}
          {/*<Route path="*" element={<NoPage />} />*/}
        {/*</Route>*/}
      </Routes>
      </BrowserRouter>
  );
}

export default App;
