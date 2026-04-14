import { useState } from 'react'
import BaseCheckbox from '~/components/BaseCheckbox'
import BaseInput from '~/components/BaseInput'
import BaseRadio from '~/components/BaseRadio'
import BaseSelect from '~/components/BaseSelect'
import SubmitButton from '~/components/SubmitButton'
import footerImage from '~/assets/footer.png'
import headerImage from '~/assets/header.png'
import type { Route } from './+types/home'

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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [organization, setOrganization] = useState('')

  const [industry, setIndustry] = useState('tech')
  const [industryDetail, setIndustryDetail] = useState('')

  const [sessions, setSessions] = useState<string[]>(['session-a'])

  const [dinner, setDinner] = useState('no')

  const [foodPreference, setFoodPreference] = useState('other')
  const [foodPreferenceDetail, setFoodPreferenceDetail] = useState('')

  function handleSubmit() {
    const payload = {
      name,
      email,
      phone,
      organization,
      industry,
      industryDetail,
      sessions,
      dinner,
      foodPreference,
      foodPreferenceDetail,
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
              value={name}
              onChange={setName}
            />

            <BaseInput
              id="email"
              type="email"
              label="常用信箱"
              required
              autoComplete="email"
              value={email}
              onChange={setEmail}
            />

            <BaseInput
              id="phone"
              type="tel"
              label="手機號碼"
              required
              autoComplete="tel"
              value={phone}
              onChange={setPhone}
            />

            <BaseInput
              id="organization"
              label="服務單位"
              required
              autoComplete="organization"
              value={organization}
              onChange={setOrganization}
            />

            <BaseSelect
              id="industry"
              label="工作產業類別"
              required
              options={industryOptions}
              value={industry}
              onChange={setIndustry}
              detailValue={industryDetail}
              onDetailChange={setIndustryDetail}
            />

            <BaseCheckbox
              name="sessions"
              label="欲參與的會議場次（複選題）"
              options={sessionOptions}
              value={sessions}
              onChange={setSessions}
              required
            />

            <BaseRadio
              name="dinner"
              label="是否參加晚宴"
              options={dinnerOptions}
              value={dinner}
              onChange={setDinner}
              required
            />

            <BaseRadio
              name="food-preference"
              label="飲食習慣"
              options={foodPreferenceOptions}
              value={foodPreference}
              onChange={setFoodPreference}
              detailValue={foodPreferenceDetail}
              onDetailChange={setFoodPreferenceDetail}
              required
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
