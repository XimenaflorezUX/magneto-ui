export interface IBreadcrumb {
  /** Breadcrumb path string (segments separated by `/`). */
  breadcrumbText: string
  /** Overrides `breadcrumbText` when set. */
  breadcrumbCustomText?: string
  /** Legacy base URL field (retained for API compatibility). */
  baseUrl: string
  /** Query string appended to server-driven links. */
  queryParams?: string
  /** When true with `breadCrumbFromServer`, renders anchor links. */
  haveRedirect?: boolean
  /** Replaces the last segment label when set. */
  detailTitle?: string | null
  /** Server-rendered breadcrumb labels (SEO). */
  breadCrumbFromServer?: string[]
  /** URLs aligned with `breadCrumbFromServer` indices. */
  urlFromServer?: string[]
  /** Accessible name for the `<nav>` landmark. */
  'aria-label'?: string
  className?: string
}
