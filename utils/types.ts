export interface Slot {
  dayIndex: number;
  slotArray: number[];
}

export type UserSlots = {
  userId: string;
  slots: Slot[];
};