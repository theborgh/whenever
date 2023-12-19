import { Slot, UserSlots } from '@/utils/types'

export const isSlotSelected = (dayIndex: number, slotIndex: number, initialSlots: UserSlots[]): boolean => {

  // for single user (interactive calendar)
  if (initialSlots && initialSlots.length === 1) {
    return initialSlots[0].slots.some((slot: Slot) => 
      slot.dayIndex === dayIndex && slot.slotArray.includes(slotIndex)
    );
  }

  return false
};