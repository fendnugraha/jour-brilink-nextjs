import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './components/MainLayout';

const App = () => {
    return (
        <MainLayout>
            {/* Add your application components here */}
        </MainLayout>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));