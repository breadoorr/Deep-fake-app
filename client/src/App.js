import logo from './logo.svg';
import './App.css';
import { Landing } from './Landing';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
          {/*<Route index element={< />} />*/}
          <Route path="/login" element={<Login />} />
          {/*<Route path="contact" element={<Contact />} />*/}
          {/*<Route path="*" element={<NoPage />} />*/}
        {/*</Route>*/}
      </Routes>
      </BrowserRouter>
  );
}

export default App;
