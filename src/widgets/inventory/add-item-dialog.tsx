import { useState  } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, PlusIcon, SaveIcon, Trash2 } from 'lucide-react'
import type { ReactNode } from 'react';
import type { ItemType, Subtask } from '@/shared/types/inventory'
import { Button } from '#/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '#/ui/dialog'
import { Input } from '#/ui/input'
import { Label } from '#/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/ui/select'
import { Switch } from '#/ui/switch'
import { Calendar } from '#/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '#/ui/popover'
import { useInventoryStore } from '@/shared/stores/inventory.store'
import { cn } from '@/lib/utils'

interface AddItemDialogProps
{
    buttonText?: ReactNode;
}

export function AddItemDialog({ buttonText = 'Добавить' }: AddItemDialogProps)
{
    const [open, setOpen] = useState(false)
    const addItem = useInventoryStore((state) => state.addItem)
    const presets = useInventoryStore((state) => state.presets)

    const [type, setType] = useState<ItemType>('consumable')
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('1')
    const [unit, setUnit] = useState('pcs')
    const [expirationDate, setExpirationDate] = useState<Date | undefined>()
    const [consumptionDays, setConsumptionDays] = useState('')
    const [frequencyDays, setFrequencyDays] = useState('7')
    const [subtasks, setSubtasks] = useState<Omit<Subtask, 'completed'>[]>([])
    const [newSubtask, setNewSubtask] = useState('')
    const [saveAsPreset, setSaveAsPreset] = useState(false)

    const handleAddSubtask = () =>
    {
        if (!newSubtask.trim()) return
        setSubtasks([...subtasks, { id: crypto.randomUUID(), name: newSubtask }])
        setNewSubtask('')
    }

    const removeSubtask = (id: string) =>
    {
        setSubtasks(subtasks.filter(t => t.id !== id))
    }

    const handlePresetSelect = (presetId: string | null) =>
    {
        if (!presetId) return
        const preset = presets.find(p => p.id === presetId)
        if (!preset) return

        setType(preset.type)
        setName(preset.name)
        if (preset.defaultUnit) setUnit(preset.defaultUnit)
        if (preset.defaultQuantity) setQuantity(preset.defaultQuantity.toString())
        if (preset.defaultConsumptionDays) setConsumptionDays(preset.defaultConsumptionDays.toString())
        if (preset.defaultFrequencyDays) setFrequencyDays(preset.defaultFrequencyDays.toString())
        if (preset.defaultSubtasks) setSubtasks(preset.defaultSubtasks)
    }

    const handleSubmit = () =>
    {
        if (!name.trim()) return

        const commonData = {
            name,
            type,
        }

        addItem({
            ...commonData,
            quantity: Number(quantity) || 1,
            totalQuantity: Number(quantity) || 1,
            unit,
            expirationDate: expirationDate?.toISOString(),
            consumptionDaysPerUnit: Number(consumptionDays) || undefined,
            frequencyDays: Number(frequencyDays) || 7,
            subtasks: subtasks.map(s => ({ ...s, completed: false })),
        })

        setOpen(false)
        resetForm()
    }

    const resetForm = () =>
    {
        setName('')
        setQuantity('1')
        setUnit('pcs')
        setExpirationDate(undefined)
        setConsumptionDays('')
        setSubtasks([])
        setSaveAsPreset(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button>
                        <PlusIcon />
                        { buttonText }
                    </Button>
                }
            />
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Добавить запись</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                    {presets.length > 0 && (
                        <div className="grid gap-2">
                            <Label>Использовать пресет</Label>
                            <Select onValueChange={handlePresetSelect}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Выберите пресет" />
                                </SelectTrigger>
                                <SelectContent>
                                    {presets.map(p => (
                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <Tabs value={type} onValueChange={(v) => setType(v as ItemType)}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="consumable">Расходник</TabsTrigger>
                            <TabsTrigger value="task">Задача</TabsTrigger>
                        </TabsList>

                        <div className="mt-4 grid gap-4">
                            <div className="grid gap-2">
                                <Label>Название</Label>
                                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Например: Молоко" />
                            </div>

                            <TabsContent value="consumable" className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label>Количество</Label>
                                        <Input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Ед. измерения</Label>
                                        <Input value={unit} onChange={e => setUnit(e.target.value)} placeholder="л, шт, кг" />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label>Срок годности (опционально)</Label>
                                    <Popover>
                                        <PopoverTrigger
                                            render={
                                                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !expirationDate && "text-muted-foreground")}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {expirationDate ? format(expirationDate, "PPP") : "Выберите дату"}
                                                </Button>
                                            }
                                        />
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={expirationDate} onSelect={setExpirationDate} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="grid gap-2">
                                    <Label>Расход (дней на 1 ед.)</Label>
                                    <Input type="number" value={consumptionDays} onChange={e => setConsumptionDays(e.target.value)} placeholder="Пример: 3 (дня на 1 пакет)" />
                                </div>
                            </TabsContent>

                            <TabsContent value="task" className="space-y-6">
                                <div className="grid gap-2">
                                    <Label>Повторять каждые (дней)</Label>
                                    <Input type="number" value={frequencyDays} onChange={e => setFrequencyDays(e.target.value)} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Подзадачи</Label>
                                    <div className="flex gap-2">
                                        <Input value={newSubtask} onChange={e => setNewSubtask(e.target.value)} placeholder="Например: Протереть пыль" onKeyDown={e => e.key === 'Enter' && handleAddSubtask()} />
                                        <Button variant="outline" size="icon" onClick={handleAddSubtask}><PlusIcon /></Button>
                                    </div>
                                    <div className="space-y-2">
                                        {subtasks.map(t => (
                                            <div key={t.id} className="flex items-center justify-between bg-secondary/20 p-2 rounded">
                                                <span className="text-sm">{t.name}</span>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeSubtask(t.id)}>
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>

                    <div className="flex items-center space-x-2 pt-2">
                        <Switch id="preset-mode" checked={saveAsPreset} onCheckedChange={setSaveAsPreset} />
                        <Label htmlFor="preset-mode">Сохранить как пресет</Label>
                    </div>

                    <Button onClick={handleSubmit} className="w-full mt-4">
                        <SaveIcon className="mr-1 size-4" />
                        Сохранить
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
