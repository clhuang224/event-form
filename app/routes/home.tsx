import { useState } from 'react'
import BaseCheckbox from '~/components/BaseCheckbox'
import BaseInput from '~/components/BaseInput'
import BaseRadio from '~/components/BaseRadio'
import BaseSelect from '~/components/BaseSelect'
import SubmitButton from '~/components/SubmitButton'
import footerImage from '~/assets/footer.png'
import headerImage from '~/assets/header.png'
import type { Route } from './+types/home'
import { useFormField } from '~/hooks/useFormField'
import { validateEmail, validateName, validateOrganization, validatePhone, validateRequired } from '~/utils/validator'

export function meta({}: Route.MetaArgs) {
  return [{ title: '線上會議報名表' }]
}

const sessionOptions = [
  { value: 'session-a', label: 'Session A' },
  { value: 'session-b', label: 'Session B' },
  { value: 'session-c', label: 'Session C' },
  { value: 'session-d', label: 'Session D' },
]

const industryOptions = [
  { value: 'tech', label: '科技業' },
  { value: 'healthcare', label: '醫療產業' },
  { value: 'finance', label: '金融業' },
  { value: 'education', label: '教育領域' },
  { value: 'other', label: '其他', hasInput: true },
]

const dinnerOptions = [
  { value: 'yes', label: '是' },
  { value: 'no', label: '否' },
]

const foodPreferenceOptions = [
  { value: 'omnivore', label: '葷食' },
  { value: 'vegetarian', label: '素食' },
  { value: 'other', label: '其他（請填寫）', hasInput: true },
]

export default function Home() {
  const { nameValue, setNameValue, nameValid, nameError } = useFormField<'name', string>('name', '', validateName, '姓名 格式錯誤')
  const { emailValue, setEmailValue, emailValid, emailError } = useFormField<'email', string>('email', '', validateEmail, '常用信箱 格式錯誤')
  const { phoneValue, setPhoneValue, phoneValid, phoneError } = useFormField<'phone', string>('phone', '', validatePhone, '手機號碼 格式錯誤')
  const { organizationValue, setOrganizationValue, organizationValid, organizationError } = useFormField<'organization', string>('organization', '', validateOrganization, '服務單位 格式錯誤')

  const { industryValue, setIndustryValue, industryValid, industryError } = useFormField<'industry', string>(
    'industry',
    'tech',
    (value) => industryOptions.some((option) => option.value === value),
    '工作產業類別 格式錯誤'
  )
  const {
    industryDetailValue,
    setIndustryDetailValue,
    industryDetailValid,
    industryDetailError,
  } = useFormField<'industryDetail', string>('industryDetail', '', validateRequired, '工作產業類別 格式錯誤')

  const [sessions, setSessions] = useState<string[]>([])

  const [dinner, setDinner] = useState('yes')

  const {
    foodPreferenceValue,
    setFoodPreferenceValue,
    foodPreferenceValid,
    foodPreferenceError,
  } = useFormField<'foodPreference', string>(
    'foodPreference',
    'omnivore',
    (value) => foodPreferenceOptions.some((option) => option.value === value),
    '飲食習慣 格式錯誤'
  )
  const {
    foodPreferenceDetailValue,
    setFoodPreferenceDetailValue,
    foodPreferenceDetailValid,
    foodPreferenceDetailError,
  } = useFormField<'foodPreferenceDetail', string>('foodPreferenceDetail', '', validateRequired, '飲食習慣 格式錯誤')

  const isIndustryDetailValid = industryValue !== 'other' || industryDetailValid
  const sessionsValid = sessions.length > 0
  const dinnerValid = dinnerOptions.some((option) => option.value === dinner)
  const isFoodPreferenceDetailValid = foodPreferenceValue !== 'other' || foodPreferenceDetailValid

  const isFormValid = [
    nameValid,
    emailValid,
    phoneValid,
    organizationValid,
    industryValid,
    isIndustryDetailValid,
    sessionsValid,
    dinnerValid,
    foodPreferenceValid,
    isFoodPreferenceDetailValid,
  ].every(Boolean)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isFormValid) {
      return
    }

    const payload = {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
      organization: organizationValue,
      industry: industryValue,
      industryDetail: industryDetailValue,
      sessions,
      dinner,
      foodPreference: foodPreferenceValue,
      foodPreferenceDetail: foodPreferenceDetailValue,
    }

    alert(`已送出報名資訊：${JSON.stringify(payload, null, 2)}`)
  }

  return (
    <main className="min-h-screen bg-[var(--color-page-bg)] px-0 sm:px-6">
      <div
        className="mx-auto max-w-[576px] overflow-hidden bg-white shadow-[0_20px_60px_rgba(199,127,168,0.14)]"
        style={{
          backgroundImage: `url(${headerImage}), url(${footerImage})`,
          backgroundPosition: 'top center, bottom center',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: '100% auto, 100% auto',
        }}
      >
        <form className="sm:px-10 px-5 pt-14 pb-26" onSubmit={handleSubmit}>
          <h1 className="text-[var(--color-primary)] font-semibold text-[44px] text-center">線上會議報名表</h1>

          <div className="space-y-10 mt-10">
            <BaseInput
              id="name"
              label="姓名"
              required
              autoComplete="name"
              value={nameValue}
              onChange={setNameValue}
              error={nameError}
            />

            <BaseInput
              id="email"
              type="email"
              label="常用信箱"
              required
              autoComplete="email"
              value={emailValue}
              onChange={setEmailValue}
              error={emailError}
            />

            <BaseInput
              id="phone"
              type="tel"
              label="手機號碼"
              required
              autoComplete="tel"
              value={phoneValue}
              onChange={setPhoneValue}
              error={phoneError}
            />

            <BaseInput
              id="organization"
              label="服務單位"
              required
              autoComplete="organization"
              value={organizationValue}
              onChange={setOrganizationValue}
              error={organizationError}
            />

            <BaseSelect
              id="industry"
              label="工作產業類別"
              required
              options={industryOptions}
              value={industryValue}
              onChange={setIndustryValue}
              detailValue={industryDetailValue}
              onDetailChange={setIndustryDetailValue}
              error={industryError || industryDetailError}
            />

            <BaseCheckbox
              name="sessions"
              label="欲參與的會議場次（複選題）"
              options={sessionOptions}
              value={sessions}
              onChange={setSessions}
              required
              error={!sessionsValid ? '欲參與的會議場次（複選題） 格式錯誤' : undefined}
            />

            <BaseRadio
              name="dinner"
              label="是否參加晚宴"
              options={dinnerOptions}
              value={dinner}
              onChange={setDinner}
              required
              error={!dinnerValid ? '是否參加晚宴 格式錯誤' : undefined}
            />

            <BaseRadio
              name="food-preference"
              label="飲食習慣"
              options={foodPreferenceOptions}
              value={foodPreferenceValue}
              onChange={setFoodPreferenceValue}
              detailValue={foodPreferenceDetailValue}
              onDetailChange={setFoodPreferenceDetailValue}
              required
              error={foodPreferenceError || foodPreferenceDetailError}
            />
          </div>

          <div className="mt-12 flex justify-center">
            <SubmitButton />
          </div>
        </form>
      </div>
    </main>
  )
}
