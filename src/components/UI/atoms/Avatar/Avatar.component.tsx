import React, { useMemo, useState } from 'react'
import { renderIconSlot } from '@shared/icons'
import { classNames } from '@shared/utils/common'
import { IAvatar } from './Avatar.interface'
import styles from './Avatar.module.scss'

const cx = classNames.bind(styles)

const DEFAULT_FALLBACK_ICON = 'user'

/**
 * User avatar atom — Magneto Design System.
 *
 * **a11y:** Interactive mode (`onClick`) uses `<button aria-label={alt}>` and `:focus-visible` ring.
 * Decorative fallback images use `alt=""` + `aria-hidden`; pass a meaningful `alt` when clickable.
 *
 * @param userImage - Profile image URL.
 * @param fallbackImage - Legacy fallback image URL (overrides registry icon when set).
 * @param fallbackIconName - Icon name from DS registry when no image (default: `user`).
 * @param fallbackIconFamily - Optional icon family override.
 * @param onClick - When set, root renders as a button with keyboard support.
 */
const Component: React.FC<IAvatar> = ({
  userImage,
  fallbackImage,
  fallbackIconName = DEFAULT_FALLBACK_ICON,
  fallbackIconFamily,
  onClick,
  className,
  alt = 'User avatar'
}) => {
  const [imageError, setImageError] = useState(false)
  const showPhoto = Boolean(userImage && !imageError)

  const registryFallback = useMemo(
    () =>
      !fallbackImage
        ? renderIconSlot({
            slot: { name: fallbackIconName, family: fallbackIconFamily },
            size: 'md',
            glyphClassName: cx('magneto-ui-avatar__fallback-icon', 'magneto-ui-icon-glyph')
          })
        : null,
    [fallbackIconFamily, fallbackIconName, fallbackImage]
  )

  const content = showPhoto ? (
    <img
      className={cx('magneto-ui-avatar__image')}
      src={userImage ?? undefined}
      alt={alt}
      loading="lazy"
      onError={() => setImageError(true)}
    />
  ) : (
    <span className={cx('magneto-ui-avatar__fallback')} aria-hidden={!fallbackImage}>
      {fallbackImage ? (
        <img className={cx('magneto-ui-avatar__fallback-image')} src={fallbackImage} alt="" aria-hidden />
      ) : (
        registryFallback
      )}
    </span>
  )

  const rootClass = cx(
    'magneto-ui-avatar',
    onClick ? 'magneto-ui-avatar--interactive' : undefined,
    className
  )

  if (onClick) {
    return (
      <button
        type="button"
        data-lib="magneto-ui"
        data-slot="avatar"
        className={rootClass}
        onClick={onClick}
        aria-label={alt}
      >
        {content}
      </button>
    )
  }

  return (
    <span data-lib="magneto-ui" data-slot="avatar" className={rootClass}>
      {content}
    </span>
  )
}

export const Avatar = Component
