export const classNames = {
  bind: (stylesObj: Record<string, string | undefined>) => {
    return (...params: Array<string | null | undefined | Record<string, boolean | undefined | null>>) =>
      params
        // avoid nullish
        .filter((param): param is string | Record<string, boolean | undefined | null> => param != null)
        .map((cls) => {
          if (typeof cls === 'string') return stylesObj[cls] ?? cls
          return Object.entries(cls)
            .filter(([, value]) => value)
            .map(([key]) => stylesObj[key] ?? key)
            .join(' ')
        })
        .join(' ')
  }
}
