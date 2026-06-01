import React, { useMemo, useState } from 'react'

import { ICON_FAMILY_DEFAULT, IconGlyph, resolveIcon, type IconSize } from '@shared/icons'

import { IconProps } from './Icon.interface'

import styles from './icon.module.scss'

import { classNames } from '@shared/utils/common'



const cx = classNames.bind(styles)



const TOKEN_SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl']



const isTokenSize = (size: IconProps['size']): size is IconSize =>

  typeof size === 'string' && TOKEN_SIZES.includes(size as IconSize)



/**

 * Design System icon atom. Resolves icons from the transversal registry (Figma libreria-Iconos).

 * Inherits `color` from the parent via currentColor (CSS mask on SVG assets).

 *

 * - Default family: `iconsax-outline`

 * - `iconsax-bold`, `tabler`, `lucide`: only when `family` is set explicitly

 *

 * @example

 * <Icon name="search" size="md" />

 * <Icon name="home" family="iconsax-bold" size="sm" />

 */

const Component: React.FC<IconProps> = ({

  alt,

  className,

  decorative,

  fallbackIcon,

  family = ICON_FAMILY_DEFAULT,

  hover = false,

  icon,

  isRotate,

  name,

  showDefaultFallback = true,

  size = 'md'

}) => {

  const [imageError, setImageError] = useState(false)



  const registrySrc = useMemo(() => (name ? resolveIcon(name, family) : null), [family, name])



  const iconSrc = useMemo(() => {

    if (imageError) return fallbackIcon

    if (name) return registrySrc ?? undefined

    return icon ?? undefined

  }, [fallbackIcon, icon, imageError, name, registrySrc])



  const sizeClass = isTokenSize(size) ? cx(`magneto-ui-icon--size-${size}`) : ''

  const legacySizeStyle =

    typeof size === 'number' ? ({ width: `${size}px`, height: `${size}px` } as const) : undefined



  const isDecorative = decorative ?? alt == null

  const isRegistrySvg = Boolean(name && registrySrc)



  if (!iconSrc && !showDefaultFallback) return null

  if (!iconSrc) return null



  const glyphClass = cx(

    'magneto-ui-icon',

    'magneto-ui-icon-glyph',

    sizeClass,

    { 'magneto-ui-rotate': isRotate },

    { 'magneto-ui-hover': hover },

    className

  )



  if (!isDecorative && alt != null && !isRegistrySvg) {

    return (

      <img

        data-name="icon"

        data-icon-name={name}

        data-icon-family={name ? family : undefined}

        style={legacySizeStyle}

        className={glyphClass}

        src={iconSrc}

        alt={alt}

        loading="lazy"

        onError={() => setImageError(true)}

      />

    )

  }



  return (

    <IconGlyph

      data-name="icon"

      data-icon-name={name}

      data-icon-family={name ? family : undefined}

      data-icon-size={isTokenSize(size) ? size : undefined}

      style={legacySizeStyle}

      className={glyphClass}

      src={iconSrc}

      inheritColor={isRegistrySvg || /\.svg($|\?)/i.test(iconSrc)}

      onError={() => setImageError(true)}

    />

  )

}



/** @deprecated Use `Icon` — kept for backward compatibility. */

export const IconItem = Component



export const Icon = Component


