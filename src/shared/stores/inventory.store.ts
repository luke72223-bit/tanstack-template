import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Item, Preset } from '../types/inventory'

interface InventoryState
{
    items: Item[]
    presets: Preset[]

    addItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void
    updateItem: (id: string, data: Partial<Item>) => void
    deleteItem: (id: string) => void
    consumeItem: (id: string, amount: number) => void
    completeTask: (id: string) => void
}

export const useInventoryStore = create<InventoryState>()(
    persist(
        (set) => ({
            items: [],
            presets: [],

            addItem: (data) => set((state) => ({
                items: [
                    ...state.items,
                    {
                        ...data,
                        id: crypto.randomUUID(),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    }
                ]
            })),

            updateItem: (id, data) => set((state) => ({
                items: state.items.map((item) =>
                    item.id === id
                        ? { ...item, ...data, updatedAt: new Date().toISOString() }
                        : item
                )
            })),

            deleteItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id)
            })),

            consumeItem: (id, amount) => set((state) => ({
                items: state.items.map((item) =>
                {
                    if (item.id !== id) return item;
                    const newQuantity = Math.max(0, item.quantity - amount);
                    return {
                        ...item,
                        quantity: newQuantity,
                        updatedAt: new Date().toISOString()
                    };
                })
            })),

            completeTask: (id) => set((state) => ({
                items: state.items.map((item) =>
                    item.id === id
                        ? { ...item, lastCompleted: new Date().toISOString(), updatedAt: new Date().toISOString() }
                        : item
                )
            })),
        }),
        {
            name: 'inventory-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
