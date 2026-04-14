import { IndustryType } from "~/enums/IndustryType";

export const industryMapName: Record<IndustryType, string> = {
  [IndustryType.TECH]: '科技業',
  [IndustryType.HEALTHCARE]: '醫療產業',
  [IndustryType.FINANCE]: '金融業',
  [IndustryType.EDUCATION]: '教育領域',
}
