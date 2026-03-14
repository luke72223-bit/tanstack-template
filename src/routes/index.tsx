import { Settings } from 'lucide-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { AddItemDialog } from '@/widgets/inventory/add-item-dialog'
import { ItemList } from '@/widgets/inventory/item-list'
import { Button } from '#/ui/button'
import Header from '#/ui/custom/Header'
import DefaultLayout from '@/widgets/layouts/DefaultLayout'
import ThemeToggler from '#/ui/custom/ThemeToggler'

export const Route = createFileRoute('/')({
    component: App
})

function App()
{
    return (
        <DefaultLayout>
            <Header
                title="Заголовок страницы"
                description="Описание страницы"
                actions={(<>
                    <Link to="/presets">
                        <Button variant="ghost" size="icon">
                            <Settings className="size-5" />
                        </Button>
                    </Link>
                    <ThemeToggler />
                    <AddItemDialog />
                </>)}
            />

            <main>
                <ItemList />
            </main>
        </DefaultLayout>
    )
}
