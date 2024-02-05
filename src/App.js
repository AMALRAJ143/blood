import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContentṣPage from './Contents-page/contentsPage';
import LoginPage from './Login-page/login-page';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/Contents" element={<ContentṣPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
