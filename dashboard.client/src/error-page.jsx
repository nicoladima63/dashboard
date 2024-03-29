import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    //console.error(error);

    return (
        <main className='main-container'>
            <h1>Oops!</h1>
            <p>Spiacente. C'e stato un errore'.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </main>
    );
}