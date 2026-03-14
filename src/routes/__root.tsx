import
{
    HeadContent,
    Scripts,
    createRootRouteWithContext,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { getLocale } from '@/paraglide/runtime'
import css from '#/styles/global.css?url'
import { TooltipProvider } from '#/ui/tooltip'
import { QueryProvider } from '@/widgets/providers'

interface MyRouterContext
{
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    beforeLoad: async () =>
    {
        if (typeof document === 'undefined') return;
        document.documentElement.setAttribute('lang', getLocale())
    },

    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'Title', // CHANGE ME
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: css,
            },
        ],
    }),
    shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode })
{
    return (
        <html lang={getLocale()} suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body className="w-screen min-h-dvh font-sans antialiased wrap-anywhere">
                <QueryProvider>
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </QueryProvider>
                <Scripts />
            </body>
        </html>
    )
}
