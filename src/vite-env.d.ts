/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEWSLETTER_WEBHOOK_URL?: string
  readonly VITE_ORDER_WEBHOOK_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

