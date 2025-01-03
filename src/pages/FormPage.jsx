import React from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../components/FormComponent";

function FormPage() {
    const navigate = useNavigate();

    const handleFormSubmit = (formData) => {
        navigate("/table", { state: { formData, dataSubmitted: true } });
    };

    return (
        <div className="container mt-5">
            <h1>Formular introducere student in baza de date</h1>
            <FormComponent onSubmit={handleFormSubmit} />
        </div>
    );
}

export default FormPage;
