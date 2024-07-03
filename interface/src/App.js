import './App.css';

import SearchResults from "./components/SearchResults";
import SearchHomeResults from "./components/SearchHomeResults";

import SearchPage from "./components/SearchPage";
import SearchHomePage from "./components/SearchHomePage";

import StrainPage from "./components/StrainPage";
import StrainList from "./components/StrainList";

import AddStrain from "./components/AddStrain/index.js";
import EditStrain from "./components/EditStrain/index.js";

import AdvancedSearch from "./components/AdvancedSearch";


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
            path = "/BacDive_Search"
            element={
              <SearchPage />
            }
          />
           <Route
            exact
            path = "/strains"
            element={
              <StrainList />
            }
          />
          <Route
            exact
            path = "/search"
            element={
              <AdvancedSearch />
            }
          />
          <Route
            exact
            path = "/strain/:id"
            element={
              <StrainPage />
            }
          />
          <Route
            exact
            path = "/add"
            element={
              <AddStrain />
            }
          />
          <Route
            exact
            path = "/edit/:id"
            element={
              <EditStrain />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
