import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <main className="flex-1 bg-gray-100 min-h-screen overflow-auto">
            {children}
        </main>
    );
};

export default MainLayout;