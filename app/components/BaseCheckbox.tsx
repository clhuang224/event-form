import checkboxIcon from '../assets/checkbox.svg'
import { useEffect, useId, useRef } from 'react'
import BaseField, { type BaseFieldProps } from './BaseField'

const BaseCheckbox: React.FC<{
  name: string
  options: Array<{ value: string; label: string }>
  value: string[]
  onChange: (v: string[]) => void
} & BaseFieldProps> = ({ name, label, options, value = [], onChange, required, error }) => {
  const groupId = useId()
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const shouldShowError = value.length > 0 && Boolean(error)

  useEffect(() => {
    const firstInput = inputRefs.current[0]
    if (!firstInput) {
      return
    }

    if (required && value.length === 0) {
      firstInput.setCustomValidity('請選擇至少一個選項。')
      return
    }

    firstInput.setCustomValidity('')
  }, [error, label, required, value.length])

  return (
    <BaseField label={label} required={required} error={shouldShowError ? error : undefined}>
      <div className="space-y-3">
        {options.map((option, index) => {
          const optionId = `${groupId}-${option.value}`
          const checked = value.includes(option.value)

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className="flex cursor-pointer items-center gap-3 text-[var(--text-field-size)] font-medium text-[#3e3e3e]"
            >
              <input
                id={optionId}
                name={name}
                type="checkbox"
                value={option.value}
                ref={(element) => {
                  inputRefs.current[index] = element
                }}
                checked={checked}
                onChange={() => {
                  const next = checked ? value.filter((v) => v !== option.value) : [...value, option.value]
                  onChange(next)
                }}
                className="peer sr-only"
              />
              <span className="relative block size-[21px] shrink-0 rounded-[3px] border border-[var(--color-choice-border)] bg-white transition peer-focus-visible:border-[var(--color-choice-focus)] peer-checked:border-transparent peer-checked:[&>img]:opacity-100">
                <img
                  src={checkboxIcon}
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
    </BaseField>
  )
}

export default BaseCheckbox
