export const getOptionsWithOther = (options: Array<{ value: string; label: string }>) => {
  return [...options, { value: 'other', label: '其他', hasInput: true }]
}
