import React from 'react';

interface DefaultLayoutProps
{
    children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) =>
{

    return (
        <div className="min-h-screen bg-background text-foreground p-3 xs:p-4 md:p-8">
            { children }
        </div>
    );
}

export default DefaultLayout;