import { Link, useRouteError } from "react-router-dom";
import './error.css';

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <>
            <h1>404 Error Page</h1>
            <p className="zoom-area"><b>Sorry</b>, an unexpected error has occurred.</p>
            <p className="zoom-area"><b>{error.statusText || error.message}</b></p>
            <section className="error-container">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
                <Link to="/" className="more-link">Go back to Home</Link>
            </div>
        </>
    );
}
