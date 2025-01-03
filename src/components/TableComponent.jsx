import React from "react";

function TableComponent({ data }) {
    return (
        <div className="container mt-4">
            {data.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Nume</th>
                        <th>Prenume</th>
                        <th>Grupa</th>
                        <th>Anul absolvirii</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.group}</td>
                            <td>{item.graduationYear}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info" role="alert">
                    No data available. Please submit the form.
                </div>
            )}
        </div>
    );
}

export default TableComponent;
