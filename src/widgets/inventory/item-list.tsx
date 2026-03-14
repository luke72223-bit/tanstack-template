import { differenceInDays, formatDistanceToNow, isPast } from 'date-fns'
import { ru } from 'date-fns/locale'
import { AlertTriangle, Check, Droplet, PackageIcon, Trash2 } from 'lucide-react'
import { AddItemDialog } from './add-item-dialog'
import type { Item } from '@/shared/types/inventory'
import { useInventoryStore } from '@/shared/stores/inventory.store'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '#/ui/card'
import { Progress } from '#/ui/progress'
import { Button } from '#/ui/button'
import { Badge } from '#/ui/badge'
import { Checkbox } from '#/ui/checkbox'
import { cn } from '@/lib/utils'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '#/ui/empty'

export function ItemList()
{
    const items = useInventoryStore(state => state.items)
    const consumeItem = useInventoryStore(state => state.consumeItem)
    const completeTask = useInventoryStore(state => state.completeTask)
    const deleteItem = useInventoryStore(state => state.deleteItem)

    const getStatusColor = (item: Item) =>
    {
        if (item.type === 'consumable')
        {
            if (item.quantity === 0) return 'destructive'
            if (item.expirationDate && differenceInDays(new Date(item.expirationDate), new Date()) < 3) return 'warning'
            return 'default'
        }
        return 'default'
    }

    if (items.length === 0)
    {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <PackageIcon />
                    </EmptyMedia>
                    <EmptyTitle>
                        Список пуст
                    </EmptyTitle>
                    <EmptyDescription>
                        Вы можете создать новый предмет, нажав на кнопку ниже.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <AddItemDialog buttonText='Создать новый' />
                </EmptyContent>
            </Empty>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map(item =>
            {
                const status = getStatusColor(item)
                return (
                    <Card key={item.id} className={cn("relative overflow-hidden transition-colors",
                        status === 'destructive' && "border-destructive/50 bg-destructive/5",
                        status === 'warning' && "border-yellow-500/50 bg-yellow-500/5"
                    )}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                                <Badge variant={item.type === 'consumable' ? 'secondary' : 'outline'} className={cn(
                                    status === 'destructive' && "bg-destructive text-destructive-foreground hover:bg-destructive/80",
                                    status === 'warning' && "bg-yellow-500 text-white hover:bg-yellow-600"
                                )}>
                                    {item.type === 'consumable' ? 'Расходник' : 'Задача'}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4 text-sm">
                            {item.type === 'consumable' && (
                                <>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Остаток: {item.quantity} {item.unit}</span>
                                            <span>{Math.round((item.quantity / item.totalQuantity) * 100)}%</span>
                                        </div>
                                        <Progress value={(item.quantity / item.totalQuantity) * 100} className="h-2" />
                                    </div>

                                    {item.expirationDate && (
                                        <div className={`flex items-center gap-2 ${isPast(new Date(item.expirationDate)) ? 'text-destructive' : 'text-muted-foreground'}`}>
                                            <AlertTriangle className="h-4 w-4" />
                                            <span>Годен до: {new Date(item.expirationDate).toLocaleDateString()}</span>
                                        </div>
                                    )}

                                    {item.consumptionDaysPerUnit && item.quantity > 0 && (
                                        <div className="text-xs text-muted-foreground">
                                            Хватит примерно на: {Math.round(item.quantity * item.consumptionDaysPerUnit)} дн.
                                        </div>
                                    )}
                                </>
                            )}

                            {item.type === 'task' && (
                                <>
                                    <div className="text-muted-foreground">
                                        Повтор: каждые {item.frequencyDays} дн.
                                    </div>
                                    {item.lastCompleted && (
                                        <div className="text-xs">
                                            Последний раз: {formatDistanceToNow(new Date(item.lastCompleted), { addSuffix: true, locale: ru })}
                                        </div>
                                    )}
                                    {item.subtasks && item.subtasks.length > 0 && (
                                        <div className="space-y-1 mt-2">
                                            {item.subtasks.map(sub => (
                                                <div key={sub.id} className="flex items-center gap-2">
                                                    <Checkbox checked={sub.completed} disabled />
                                                    <span className={sub.completed ? 'line-through opacity-50' : ''}>{sub.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </CardContent>

                        <CardFooter className="flex justify-between pt-2">
                            <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>

                            {item.type === 'consumable' && item.quantity > 0 && (
                                <Button size="sm" onClick={() => consumeItem(item.id, 1)}>
                                    <Droplet className="mr-2 h-4 w-4" />
                                    -1 {item.unit}
                                </Button>
                            )}

                            {item.type === 'task' && (
                                <Button size="sm" onClick={() => completeTask(item.id)}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Выполнено
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    )
}
