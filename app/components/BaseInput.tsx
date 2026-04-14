import BaseField, { type BaseFieldProps } from "./BaseField"

const BaseInput: React.FC<{
    type: 'text' | 'email' | 'phone',
    label: string
} & BaseFieldProps> = ({ label, options }) => {
    return (
        <BaseField label={label}>
            {options.map(option => (
                <label key={option.value}>
                    <input type="checkbox" value={option.value} />
                    {option.label}
                </label>
            ))}
        </BaseField>
    )
}

export default BaseInput
