import { FoodPreferenceType } from "~/enums/FoodPreferenceType";

export const foodPreferenceMapName: Record<FoodPreferenceType, string> = {
  [FoodPreferenceType.OMNIVORE]: '葷食',
  [FoodPreferenceType.VEGETARIAN]: '素食',
}
