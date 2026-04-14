import BaseInput from '~/components/BaseInput'
import type { Route } from './+types/home'
import BaseCheckbox from '~/components/BaseCheckbox'
import BaseRadio from '~/components/BaseRadio'
import SubmitButton from '~/components/SubmitButton'

export function meta({}: Route.MetaArgs) {
  return [
    { title: '線上會議報名表' }
  ]
}

export default function Home() {
  const sessionOptions = [
    { value: 'session-a', label: 'Session A' },
    { value: 'session-b', label: 'Session B' },
    { value: 'session-c', label: 'Session C' },
    { value: 'session-d', label: 'Session D' },
  ]
  const isAttendingDinnerOptions = [
    { value: 'yes', label: '是' },
    { value: 'no', label: '否' },
  ]
  const foodPreferenceOptions = [
    { value: 'omnivore', label: '葷食' },
    { value: 'vegetarian', label: '素食' },
    { value: 'other', label: '其他 (請填寫)', hasInput: true },
  ]
  return (
    <form className="max-w-576px px-42px py-56px">
      <BaseInput
        label="姓名"
        type="text"
        required
      />
      <BaseInput
        label="常用信箱"
        type="email"
        required
      />
      <BaseInput
        label="手機號碼"
        type="phone"
        required
      />
      <BaseInput
        label="服務單位"
        type="text"
        required
      />
      <BaseSelect
        id="industry"
        label="工作產業類別"
        type="text"
        required
      />
      <BaseCheckbox
        label="欲參與的會議場次 (複選題)"
        options={sessionOptions}
        required
      />
      <BaseRadio
        label="是否參加晚宴"
        options={isAttendingDinnerOptions}
        required
      />
      <BaseRadio
        label="飲食習慣"
        options={foodPreferenceOptions}
        required
      />
      <SubmitButton
        label="馬上報名"
      />
    </form>
  )
}
