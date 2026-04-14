import { useState } from 'react'

export const useFormField = <T>(
    initialValue: T,
    validator?: (value: T) => boolean
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] => {
  const [value, setValue] = useState(initialValue)

  const valid = validator?.(value) ?? false

  return [
    value,
    setValue,
    valid
  ]
}
