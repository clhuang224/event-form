export const validateName = (name: string) => {
  const re = /^[A-Za-z\u4E00-\u9FFF\s]+$/
  return re.test(name.trim())
}

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone: string) => {
  const normalizedPhone = phone.replace(/-/g, '')
  const re = /^\d{10}$/
  return re.test(normalizedPhone)
}

export const validateRequired = (value: string) => {
  return value.trim().length > 0
}

export const validateOrganization = (organization: string) => {
  const re = /^[A-Za-z0-9\u4E00-\u9FFF\s]+$/
  return re.test(organization.trim())
}
