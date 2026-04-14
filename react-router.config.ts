import type { Config } from '@react-router/dev/config'

export default {
  basename: process.env.NODE_ENV === 'production' ? '/event-form/' : '/',
  ssr: false
} satisfies Config
