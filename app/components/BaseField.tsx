export interface BaseFieldProps {
  label: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
}

const BaseField = ({
  label,
  required,
  hint,
  error,
  className,
  children,
}: React.PropsWithChildren<BaseFieldProps>) => {
  return (
    <fieldset className={className}>
      <legend className="mb-4 text-[var(--text-label-size)] font-medium text-[var(--color-primary)]">
        {label}
        {required && (<span className="ml-1 text-[var(--color-primary)]">*</span>)}
      </legend>
      {children}
      {error && (
        <p className="mt-2 text-right text-3 text-[var(--color-field-error)]">{error}</p>
      )}
      {!error && hint && (
        <p className="mt-2 text-right text-3 text-[var(--color-field-hint)]">{hint}</p>
      )}
    </fieldset>
  )
}

export default BaseField
