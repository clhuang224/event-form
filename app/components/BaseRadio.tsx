import radioIcon from '../assets/radio.svg'
import { useId } from 'react'
import BaseField, { type BaseFieldProps } from './BaseField'

type RadioOption = {
  value: string
  label: string
  hasInput?: boolean
}

const BaseRadio: React.FC<{
  name: string
  options: RadioOption[]
  value: string
  onChange: (v: string) => void
  inputPlaceholder?: string
  detailValue?: string
  onDetailChange?: (v: string) => void
} & BaseFieldProps> = ({
  name,
  label,
  options,
  required,
  error,
  value,
  onChange,
  inputPlaceholder = '請填寫',
  detailValue,
  onDetailChange,
}) => {
  const groupId = useId()
  const showInput = options.some((option) => option.value === value && option.hasInput)
  const shouldShowError = showInput
    ? (detailValue?.trim().length ?? 0) > 0 && Boolean(error)
    : value.trim().length > 0 && Boolean(error)

  return (
    <BaseField label={label} required={required} error={shouldShowError ? error : undefined}>
      <div className="flex flex-wrap gap-x-12 gap-y-4">
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className="flex cursor-pointer items-center gap-3 text-[length:var(--text-field-size)] font-medium text-[#4a4a4a]"
            >
              <input
                id={optionId}
                name={name}
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span className="relative block size-[21px] shrink-0 rounded-full border border-[var(--color-choice-border)] bg-white peer-checked:border-transparent peer-checked:[&>img]:opacity-100">
                <img
                  src={radioIcon}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 size-[21px] opacity-0 transition-opacity"
                />
              </span>
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
      {showInput ? (
        <input
          name={`${name}-detail`}
          type="text"
          required={showInput}
          placeholder={inputPlaceholder}
          value={detailValue}
          onChange={(e) => onDetailChange?.(e.target.value)}
          className="mt-4 h-[var(--size-field-height)] w-full rounded-[var(--rounded)] border border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-4 text-[length:var(--text-field-size)] font-medium text-[var(--color-input-text)] outline-none transition placeholder:text-[var(--color-field-hint)] hover:border-[var(--color-input-focus)] focus:border-[var(--color-input-focus)]"
        />
      ) : null}
    </BaseField>
  )
}

export default BaseRadio
