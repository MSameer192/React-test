import React, { lazy } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));



// Check for login and initialize axios

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          {/* <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/login"} replace />}/> */}

          <Route path="*" element={<Navigate to={"/app/welcome"} />} />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
