import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import type { AppConfig } from 'src/core/types'
import * as CoreUiComponents from 'src/core/ui'
import * as Components from 'src/components'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import defaultEn from 'src/core/locales/en.json'
import customEn from 'src/locales/en.json'

export const useAppConfig = (app: App<Element>) => {
  const config: AppConfig = {
    loadCoreUiComponents: (): AppConfig => {
      Object.entries(CoreUiComponents).forEach(([name, component]) =>
        app.component(name, component),
      )
      return config
    },

    loadComponents: (): AppConfig => {
      Object.entries(Components).forEach(([name, component]) =>
        app.component(name, component),
      )
      return config
    },

    setLocal: (locale: string, useCustomLocale: boolean): AppConfig => {
      const messages = {
        en: useCustomLocale ? customEn : defaultEn,
      }

      const i18n = createI18n({
        locale: locale,
        fallbackLocale: 'en',
        messages: messages,
        legacy: false,
      })

      app.use(i18n)

      return config
    },

    setStore: (): AppConfig => {
      const pinia = createPinia()
      pinia.use(piniaPluginPersistedstate)
      app.use(pinia)

      return config
    },
  }

  return config
}
