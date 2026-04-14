import { useState } from 'react'

const getHasValue = <T>(value: T) => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  return Boolean(value)
}

const capitalize = (value: string) => {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

type UseFormFieldResult<Id extends string, T> = {
  [K in `${Id}Value`]: T
} & {
  [K in `set${Capitalize<Id>}Value`]: (value: T) => void
} & {
  [K in `${Id}Valid`]: boolean
} & {
  [K in `${Id}Error`]: string
}

export const useFormField = <Id extends string, T>(
  id: Id,
  initialValue: T,
  validator?: (value: T) => boolean,
  errorMessage: string = ''
): UseFormFieldResult<Id, T> => {
  const [value, setValue] = useState(initialValue)

  const valid = validator?.(value) ?? false
  const hasValue = getHasValue(value)
  const error = hasValue && !valid ? errorMessage : ''
  const setterKey = `set${capitalize(id)}Value` as `set${Capitalize<Id>}Value`
  const setFieldValue = (nextValue: T) => {
    setValue(nextValue)
  }

  return {
    [`${id}Value`]: value,
    [setterKey]: setFieldValue,
    [`${id}Valid`]: valid,
    [`${id}Error`]: error,
  } as UseFormFieldResult<Id, T>
}
