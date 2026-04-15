export interface BaseFieldProps {
  label: string
  labelFor?: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
}

const BaseField = ({
  label,
  labelFor,
  required,
  hint,
  error,
  className,
  children,
}: React.PropsWithChildren<BaseFieldProps>) => {
  return (
    <div className={className}>
      <label
        htmlFor={labelFor}
        className="mb-4 block text-[length:var(--text-label-size)] font-medium text-[var(--color-primary)]"
      >
        {label}
        {required && (<span className="ml-1 text-[color:var(--color-primary)]">*</span>)}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-right text-3 text-[var(--color-field-error)]">{error}</p>
      )}
      {!error && hint && (
        <p className="mt-2 text-right text-3 text-[var(--color-field-hint)]">{hint}</p>
      )}
    </div>
  )
}

export default BaseField
