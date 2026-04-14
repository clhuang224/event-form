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
import { validateEmail, validateName, validateOrganization, validatePhone } from '~/utils/validator'
import { getEnumValues } from '~/utils/getEnumValues'
import { getOptionsWithOther } from '~/utils/getOptionsWithOther'
import { SessionType } from '~/enums/SessionType'
import { IndustryType } from '~/enums/IndustryType'
import { YesNoType } from '~/enums/YesNoType'
import { FoodPreferenceType } from '~/enums/FoodPreferenceType'
import { sessionMapName } from '~/constants/sessionMapName'
import { industryMapName } from '~/constants/industryMapName'
import { yesNoMapName } from '~/constants/yesNoMapName'
import { foodPreferenceMapName } from '~/constants/foodPreferenceMapName'

export function meta({}: Route.MetaArgs) {
  return [{ title: '線上會議報名表' }]
}

const sessionOptions = getEnumValues(SessionType).map((session) => ({
  value: session,
  label: sessionMapName[session],
}))

const industryOptions = getOptionsWithOther(
  getEnumValues(IndustryType).map((industry) => ({
    value: industry,
    label: industryMapName[industry],
  }))
)

const dinnerOptions = getEnumValues(YesNoType).map((dinner) => ({
  value: dinner,
  label: yesNoMapName[dinner],
}))

const foodPreferenceOptions = getOptionsWithOther(
  getEnumValues(FoodPreferenceType).map((foodPreference) => ({
    value: foodPreference,
    label: foodPreferenceMapName[foodPreference],
  }))
)

export default function Home() {
  const { nameValue, setNameValue, nameValid, nameError } = useFormField<'name', string>('name', '', validateName, '姓名 格式錯誤')
  const { emailValue, setEmailValue, emailValid, emailError } = useFormField<'email', string>('email', '', validateEmail, '常用信箱 格式錯誤')
  const { phoneValue, setPhoneValue, phoneValid, phoneError } = useFormField<'phone', string>('phone', '', validatePhone, '手機號碼 格式錯誤')
  const { organizationValue, setOrganizationValue, organizationValid, organizationError } = useFormField<'organization', string>('organization', '', validateOrganization, '服務單位 格式錯誤')

  const {
    industryValue,
    setIndustryValue,
    industryValid,
    industryError,
    industryDetailValue,
    setIndustryDetailValue,
  } = useFormField<'industry', IndustryType | 'other', true>(
    'industry',
    IndustryType.TECH,
    (value) => industryOptions.some((option) => option.value === value),
    '工作產業類別 格式錯誤',
    true
  )

  const [sessions, setSessions] = useState<string[]>([])

  const [dinner, setDinner] = useState<YesNoType>(YesNoType.YES)

  const {
    foodPreferenceValue,
    setFoodPreferenceValue,
    foodPreferenceValid,
    foodPreferenceError,
    foodPreferenceDetailValue,
    setFoodPreferenceDetailValue,
  } = useFormField<'foodPreference', FoodPreferenceType | 'other', true>(
    'foodPreference',
    FoodPreferenceType.OMNIVORE,
    (value) => foodPreferenceOptions.some((option) => option.value === value),
    '飲食習慣 格式錯誤',
    true
  )

  const isIndustryDetailValid =
    industryValue !== 'other' || industryDetailValue.trim().length > 0
  const sessionsValid = sessions.length > 0
  const dinnerValid = dinnerOptions.some((option) => option.value === dinner)
  const isFoodPreferenceDetailValid =
    foodPreferenceValue !== 'other' || foodPreferenceDetailValue.trim().length > 0

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
              onChange={(value) => setIndustryValue(value as IndustryType | 'other')}
              detailValue={industryDetailValue}
              onDetailChange={setIndustryDetailValue}
              error={industryError}
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
              onChange={(value) => setDinner(value as YesNoType)}
              required
              error={!dinnerValid ? '是否參加晚宴 格式錯誤' : undefined}
            />

            <BaseRadio
              name="food-preference"
              label="飲食習慣"
              options={foodPreferenceOptions}
              value={foodPreferenceValue}
              onChange={(value) =>
                setFoodPreferenceValue(value as FoodPreferenceType | 'other')
              }
              detailValue={foodPreferenceDetailValue}
              onDetailChange={setFoodPreferenceDetailValue}
              required
              error={foodPreferenceError}
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
