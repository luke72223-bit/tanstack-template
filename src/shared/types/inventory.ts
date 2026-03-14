export type ItemType = 'consumable' | 'task';

export interface Subtask
{
    id: string;
    name: string;
    completed: boolean;
}

export interface Item
{
    id: string;
    name: string;
    type: ItemType;

    // Consumable specific
    quantity: number; // Current amount
    totalQuantity: number; // Initial amount (for progress)
    unit: string; // e.g., 'l', 'pcs'
    expirationDate?: string; // ISO Date
    consumptionDaysPerUnit?: number; // How many days 1 unit lasts

    // Task specific
    lastCompleted?: string; // ISO Date
    frequencyDays?: number; // How often to repeat
    subtasks?: Subtask[];

    createdAt: string;
    updatedAt: string;
}

export interface Preset
{
    id: string;
    name: string;
    type: ItemType;
    defaultUnit?: string;
    defaultQuantity?: number;
    defaultConsumptionDays?: number;
    defaultFrequencyDays?: number;
    defaultSubtasks?: Omit<Subtask, 'completed'>[];
}
