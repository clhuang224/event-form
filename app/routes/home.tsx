import type { Route } from './+types/home'
import { Welcome } from '../welcome/welcome'

export function meta({}: Route.MetaArgs) {
  return [
    { title: '線上會議報名表' }
  ]
}

export default function Home() {
  return <Welcome />
}
