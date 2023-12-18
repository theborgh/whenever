import { Slot } from '../DragSelectableCalendar/utils'

export const isSlotSelected = (dayIndex: number, slotIndex: number,  initialSlots: Slot[]): boolean => {

  return initialSlots && initialSlots.some((slot: Slot) => {
    return slot.dayIndex === dayIndex && slot.slotArray.includes(slotIndex);
  });
};