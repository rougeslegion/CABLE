import './App.css';

import SearchPage from "./components/SearchPage";
import SearchResults from "./components/SearchResults";
import StrainPage from "./components/StrainPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute.jsx"
import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8000'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
      <PrivateRoute />
        <Routes>
          <Route
            exact
            path = "/"
            element={
              <SearchPage />
            }
          />
           <Route
            exact
            path = "/strains"
            element={
              <SearchResults />
            }
          />
           <Route
            exact
            path = "/species"
            element={
                <StrainPage />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
