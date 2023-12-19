import { Slot, UserSlots } from '@/utils/types'

export const countUsersAvailableInSlot = (dayIndex: number, slotIndex: number, initialSlots: UserSlots[]): number => {
  return initialSlots.reduce((acc: number, user: UserSlots) => {
    return acc + (user.slots.some((slot: Slot) => 
      slot.dayIndex === dayIndex && slot.slotArray.includes(slotIndex)
    ) ? 1 : 0)
  }, 0)
};