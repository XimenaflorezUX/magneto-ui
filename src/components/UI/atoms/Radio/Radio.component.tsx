import React, { useMemo } from 'react'
import { ERadioType, ComponentProps } from './Radio.interface'
import { getRadioComponent } from './Radio.constants'

/**
 * Radio atom — Magneto Design System.
 *
 * - `type="radio"` (default): Figma card + circular indicator (RadioDefault)
 * - `type="button"`: chip-style variant (legacy)
 *
 * **a11y:** Pass `id`, `name` (group), and `disabled` per option. Prefer `<fieldset>` + `<legend>` for groups.
 */
const Component = <T extends keyof typeof ERadioType = 'radio'>({
  type = 'radio' as T,
  ...props
}: { type?: T } & ComponentProps<T>) => {
  const RadioType = useMemo(() => getRadioComponent(ERadioType[type ?? ERadioType.radio]), [type])

  if (!RadioType) return null

  return <RadioType {...(props as object)} />
}

export const Radio = Component
