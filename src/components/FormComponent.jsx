import React, { useState, useRef, useEffect } from "react";
import * as Yup from "yup";

function FormComponent({ onSubmit }) {
    // hook-uri useState pentru fiecare field
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [group, setGroup] = useState("");
    const [graduationYear, setGraduationYear] = useState("");

    // State pentru erorile de validare generate de yup
    const [errors, setErrors] = useState({});

    // useRef hook pentru primul field
    const nameInputRef = useRef(null);

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Numele este un camp obligatoriu."),
        surname: Yup.string().required("Prenumele este un camp obligatoriu."),
        group: Yup.string().required("Grupa este un camp obligatoriu."),
        graduationYear: Yup.number()
            .required("Anul absolvirii este un camp obligatoriu.")
            .typeError("Anul absolvirii trebuie sa fie un an valid.")
    });

    // Generarea anilor
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => 1950 + i);

    // focus pe primul field cand se monteaza componenta
    useEffect(() => {
        nameInputRef.current.focus();
    }, []);

    // functia de handleSubmit trigger-uita la apasarea butonului de submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { name, surname, group, graduationYear };

        try {
            // Validarea datelor din form folosind yup
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({}); // daca field-urile sunt validate cu succes, se sterg erorile
            onSubmit(formData); // pasarea datelor la parinte (FormPage)
            resetForm(); // resetarea formularului
        } catch (validationErrors) {
            // se actualizeaza state-ul map-ului ce tine erorile
            const newErrors = validationErrors.inner.reduce(
                (acc, error) => ({ ...acc, [error.path]: error.message }),
                {}
            );
            setErrors(newErrors);
        }
    };

    // Resetarea field-urilor din form
    const resetForm = () => {
        setName("");
        setSurname("");
        setGroup("");
        setGraduationYear("");
        setErrors({});
        nameInputRef.current.focus(); // Refocus the first field
    };

    // atunci cand se scrie in field-ul in care era inainte afisata o eraore, sa se stearga eroarea
    const handleChange = (setter, fieldName) => (e) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <div className="mb-3">
                <label className="form-label">Nume:</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleChange(setName, "name")}
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    ref={nameInputRef} // Atasarea referintei ca sa fie focus-ul pe field ul respectiv (campul respectiv este selectat cand se da refresh la form spre ex)
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Prenume:</label>
                <input
                    type="text"
                    value={surname}
                    onChange={handleChange(setSurname, "surname")}
                    className={`form-control ${errors.surname ? "is-invalid" : ""}`}
                />
                {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Grupa:</label>
                <input
                    type="text"
                    value={group}
                    onChange={handleChange(setGroup, "group")}
                    className={`form-control ${errors.group ? "is-invalid" : ""}`}
                />
                {errors.group && <div className="invalid-feedback">{errors.group}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Anul absolvirii:</label>
                <select
                    value={graduationYear}
                    onChange={handleChange(setGraduationYear, "graduationYear")}
                    className={`form-select ${errors.graduationYear ? "is-invalid" : ""}`}
                >
                    <option value="">Selecteaza anul</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                {errors.graduationYear && (
                    <div className="invalid-feedback">{errors.graduationYear}</div>
                )}
            </div>

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Clear
                </button>
            </div>
        </form>
    );
}

export default FormComponent;
