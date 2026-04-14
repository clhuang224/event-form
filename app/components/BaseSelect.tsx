import BaseField, { type BaseFieldProps } from "./BaseField"

const BaseSelect: React.FC<{
    value: string,
    label: string,
    options: Array<{ value: string, label: string, hasInput?: boolean }>
} & BaseFieldProps> = ({ value, label, options }) => {
    const showInput = options.some(option => option.hasInput && option.value === value);
    return (
        <BaseField label={label}>
            <select>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
                {showInput && <input type="text" placeholder="請填寫" />}
            </select>
        </BaseField>
    )
}

export default BaseSelect
