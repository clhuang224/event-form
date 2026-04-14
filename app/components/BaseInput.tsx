import BaseField, { type BaseFieldProps } from './BaseField'

type BaseInputType = 'text' | 'email' | 'tel'

const BaseInput: React.FC<{
  id: string
  type?: BaseInputType
  placeholder?: string
  autoComplete?: string
  value?: string
  onChange?: (v: string) => void
  readOnly?: boolean
  onClick?: () => void
  rightAdornment?: React.ReactNode
  inputClassName?: string
} & BaseFieldProps> = ({
  id,
  type = 'text',
  label,
  required,
  hint,
  error,
  placeholder,
  autoComplete,
  value,
  onChange,
  readOnly,
  onClick,
  rightAdornment,
  inputClassName,
}) => {
  const hasValue = (value?.trim().length ?? 0) > 0
  const hasError = hasValue && Boolean(error)
  const defaultInputClassName = `h-[var(--size-field-height)] w-full rounded-[var(--rounded)] border bg-[var(--color-input-bg)] px-4 text-[length:var(--text-field-size)] font-medium text-[#444] outline-none transition placeholder:text-[var(--color-field-hint)] ${
    hasError
      ? 'border-[var(--color-field-error)]'
      : 'border-[var(--color-input-border)] hover:border-[var(--color-input-focus)] focus:border-[var(--color-input-focus)]'
  }`

  return (
    <BaseField
      className="space-y-0"
      label={label}
      required={required}
      hint={hint}
      error={hasError ? error : undefined}
    >
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          value={value}
          readOnly={readOnly}
          onClick={onClick}
          onChange={(e) => onChange?.(e.target.value)}
          className={`${defaultInputClassName} ${inputClassName ?? ''}`}
        />
        {rightAdornment && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            {rightAdornment}
          </span>
        )}
      </div>
    </BaseField>
  )
}

export default BaseInput
