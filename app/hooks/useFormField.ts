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

type UseFormFieldDetailResult<Id extends string> = {
  [K in `${Id}DetailValue`]: string
} & {
  [K in `set${Capitalize<Id>}DetailValue`]: (value: string) => void
}

export const useFormField = <Id extends string, T, HasOther extends boolean = false>(
  id: Id,
  initialValue: T,
  validator?: (value: T) => boolean,
  errorMessage: string = '',
  hasOther?: HasOther
): UseFormFieldResult<Id, T> &
  (HasOther extends true ? UseFormFieldDetailResult<Id> : Record<string, never>) => {
  const [value, setValue] = useState(initialValue)
  const [detailValue, setDetailValue] = useState('')

  const valid = validator?.(value) ?? false
  const hasValue = getHasValue(value)
  const error = hasValue && !valid ? errorMessage : ''
  const setterKey = `set${capitalize(id)}Value` as `set${Capitalize<Id>}Value`
  const detailSetterKey = `set${capitalize(id)}DetailValue` as `set${Capitalize<Id>}DetailValue`
  const setFieldValue = (nextValue: T) => {
    setValue(nextValue)
  }
  const setFieldDetailValue = (nextValue: string) => {
    setDetailValue(nextValue)
  }

  return {
    [`${id}Value`]: value,
    [setterKey]: setFieldValue,
    [`${id}Valid`]: valid,
    [`${id}Error`]: error,
    ...(hasOther
      ? {
          [`${id}DetailValue`]: detailValue,
          [detailSetterKey]: setFieldDetailValue,
        }
      : {}),
  } as UseFormFieldResult<Id, T> &
    (HasOther extends true ? UseFormFieldDetailResult<Id> : Record<string, never>)
}
