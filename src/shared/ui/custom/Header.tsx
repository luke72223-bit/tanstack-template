import React from 'react';
import { ChevronLeftIcon } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Button } from '#/ui/button';

interface HeaderProps
{
    title: ReactNode;
    description?: ReactNode;
    actions?: ReactNode;
    backButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    title,
    description,
    actions,
    backButton = false,
}) =>
{
    const navigate = useNavigate();
    const home = () => navigate({ to: '/' });

    return (
        <header className="flex flex-wrap items-center sm:justify-between gap-4 mb-8">
            {backButton && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={home}
                >
                    <ChevronLeftIcon className="size-5" />
                </Button>
            )}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    { title }
                </h1>
                {description && (
                    <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        { description }
                    </p>
                )}
            </div>

            {actions && (
                <div className="flex gap-4 items-center ml-auto">
                    { actions }
                </div>
            )}
        </header>
    );
}

export default Header;