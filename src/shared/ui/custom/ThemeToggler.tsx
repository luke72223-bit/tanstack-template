import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useUIStore } from '#/stores/ui.store';
import { Button } from '#/ui/button';

const ThemeToggler: React.FC = () =>
{
    const { theme, toggleTheme } = useUIStore();

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
        </Button>
    );
}

export default ThemeToggler;