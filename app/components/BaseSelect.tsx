import { useEffect, useMemo, useRef, useState } from 'react'
import arrowIcon from '../assets/arrow.svg'
import { type BaseFieldProps } from './BaseField'
import BaseInput from './BaseInput'

type SelectOption = {
  value: string
  label: string
  hasInput?: boolean
}

const BaseSelect: React.FC<{
  id: string
  options: SelectOption[]
  value: string
  onChange: (v: string) => void
  invalid?: boolean
  inputPlaceholder?: string
  detailValue?: string
  onDetailChange?: (v: string) => void
} & BaseFieldProps> = ({
  id,
  label,
  required,
  hint,
  error,
  className,
  options,
  value,
  onChange,
  invalid,
  inputPlaceholder = '請填寫',
  detailValue,
  onDetailChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const showInput = options.some((option) => option.value === value && option.hasInput)
  const selectedLabel = useMemo(
    () => options.find((option) => option.value === value)?.label ?? '',
    [options, value]
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (!rootRef.current?.contains(target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const shouldShowError = showInput
    ? (detailValue?.trim().length ?? 0) > 0 && Boolean(invalid)
    : selectedLabel.trim().length > 0 && Boolean(invalid)

  return (
    <div ref={rootRef} className={`relative ${className ?? ''}`}>
      <BaseInput
        id={id}
        label={label}
        required={required}
        hint={hint}
        error={shouldShowError ? error : undefined}
        invalid={shouldShowError}
        value={selectedLabel}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
        inputClassName="cursor-pointer pr-12"
        rightAdornment={
          <img
            src={arrowIcon}
            alt=""
            aria-hidden="true"
            className={`w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        }
      />

      {isOpen && (
        <div className="absolute left-0 top-[88px] z-20 mt-1.5 w-full rounded-[var(--rounded)] bg-white p-2 shadow-[1px_1px_7px_#ccc]">
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className="block w-full rounded-[var(--rounded)] px-3 py-2 text-left text-[var(--text-field-size)] font-medium transition hover:bg-[var(--color-page-bg)] cursor-pointer"
              >
                {option.label}
              </button>
            )
          })}
        </div>
      )}
      {showInput && (
        <input
          name={`${id}-detail`}
          type="text"
          required={showInput}
          placeholder={inputPlaceholder}
          value={detailValue}
          onChange={(e) => onDetailChange?.(e.target.value)}
          className="mt-4 h-[var(--size-field-height)] w-full rounded-[var(--rounded)] border border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-4 text-[var(--text-field-size)] font-medium text-[#3e3e3e] outline-none transition placeholder:text-[var(--color-field-hint)] hover:border-[var(--color-input-focus)] focus:border-[var(--color-input-focus)]"
        />
      )}
    </div>
  )
}

export default BaseSelect
