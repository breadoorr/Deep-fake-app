import logo from './logo.svg';
import './App.css';
import { Landing } from './pages/Landing';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./components/notFound";
import Login from "./pages/Login";
import {Profile} from "./pages/Profile";
import {Leaderboard} from "./pages/Leaderboard";
import {Settings} from "./pages/Settings";
import {Menu} from "./pages/Menu";
import {Game} from "./pages/Game";
import {Learning} from "./pages/Learning";
import {Start} from "./components/Start";
import {Rules} from "./pages/Rules";
import {LoadingScreen} from "./pages/Loading";
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter basename="/Deep-fake-app">
      <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leader" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notFound" element={<NotFound />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/game" element={<Game />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/start" element={<Start />} />
          <Route path="/start" element={<Start />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
      </UserProvider>
  );
}

export default App;
