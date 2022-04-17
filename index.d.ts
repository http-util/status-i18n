declare module '@http-util/status-i18n' {
  export function status(
    statusCode: number | undefined,
    locale: string
  ): string | undefined
}
