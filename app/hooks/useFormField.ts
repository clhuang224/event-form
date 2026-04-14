import { useState } from 'react'

const getHasValue = <T>(value: T) => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  return Boolean(value)
}

export const useFormField = <T>(
  initialValue: T,
  validator?: (value: T) => boolean,
  errorMessage: string = ''
): [T, React.Dispatch<React.SetStateAction<T>>, boolean, string] => {
  const [value, setValue] = useState(initialValue)

  const valid = validator?.(value) ?? false
  const hasValue = getHasValue(value)
  const error = hasValue && !valid ? errorMessage : ''

  return [
    value,
    setValue,
    valid,
    error,
  ]
}
