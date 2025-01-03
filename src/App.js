import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import TablePage from "./pages/TablePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FormPage />} />
                <Route path="/table" element={<TablePage />} />
            </Routes>
        </Router>
    );
}

export default App;
