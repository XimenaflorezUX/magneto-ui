import type { IconFamily } from '@shared/icons'

export interface IAvatar {
  /** Profile image URL. */
  userImage?: string | null
  /**
   * Legacy fallback image URL when the profile image is missing or fails to load.
   * When omitted, uses the DS icon registry (`fallbackIconName`).
   */
  fallbackImage?: string
  /** DS registry icon name for the empty state. Default: `user`. */
  fallbackIconName?: string
  /** Icon family override (default: `iconsax-outline`). */
  fallbackIconFamily?: IconFamily
  /** Accessible name for the avatar / button. */
  alt?: string
  /** Optional click handler — root becomes a `<button>`. */
  onClick?: () => void
  className?: string
}
