import BaseField, { type BaseFieldProps } from "./BaseField"

const BaseRadio: React.FC<{
    label: string,
    options: Array<{ value: string, label: string, hasInput?: boolean }>
} & BaseFieldProps> = ({ label, options }) => {
    return (
        <BaseField label={label}>
            {options.map(option => (
                <label key={option.value}>
                    <input type="radio" value={option.value} name={label} />
                    {option.label}
                    {option.hasInput && <input type="text" placeholder="請填寫" />}
                </label>
            ))}
        </BaseField>
    )
}

export default BaseRadio
