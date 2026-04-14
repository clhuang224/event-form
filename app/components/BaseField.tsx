export interface BaseFieldProps {
    label: string,
    required?: boolean
}

const BaseField = ({ label, children } : React.PropsWithChildren<{
    label: string,
    required?: boolean
}>) => {
    return (
        <fieldset>
        <label>{label}</label>
            {children}
        </fieldset>
    )
}

export default BaseField
