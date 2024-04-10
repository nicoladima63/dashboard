import React from 'react';
//import './App.css';
import { Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/bisogni" component={bisogni} />
            <Route path="/dashboard" component={dashboard} />
        </BrowserRouter>

    );
}
export default App;