import React from "react";
import { Link } from 'react-router-dom';
import './error.css';
function ErrorComponent(){
    return (
        <div className="error-container">
            <h1 className="error-title">404 - Página No Encontrada</h1>
            <p className="error-description">
                Lo sentimos, la página que estás buscando no existe.
            </p>
            <Link to="/" className="error-home-link">
                Volver a la página principal
            </Link>
        </div>
        );
}
        

export default ErrorComponent;