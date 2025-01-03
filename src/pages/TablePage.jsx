import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableComponent from "../components/TableComponent";

function TablePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { formData, dataSubmitted } = location.state || {};

    if (!formData) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning" role="alert">
                    Nu exista date. Va rugam inregistrati studenti folosind formularul.
                </div>
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    Inapoi la formular
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            {dataSubmitted && (
                <div className="alert alert-success" role="alert">
                    Datele au fost inscrise cu succes!
                </div>
            )}
            <h1>Tabel studenti inregistrati</h1>
            <TableComponent data={[formData]} />
            <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
                Inapoi la formular
            </button>
        </div>
    );
}

export default TablePage;
