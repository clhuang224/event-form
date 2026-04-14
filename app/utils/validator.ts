export const validateName = (name: string) => {
  return name.trim().length > 0
}

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone: string) => {
  const re = /^\d{10}$/
  return re.test(phone)
}
