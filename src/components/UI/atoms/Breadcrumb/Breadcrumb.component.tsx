import React, { useMemo } from 'react'
import { classNames } from '@shared/utils/common'
import { IBreadcrumb } from './Breadcrumb.interface'
import styles from './Breadcrumb.module.scss'

const cx = classNames.bind(styles)

const UUID_IN_TITLE =
  /[0-9a-f]{8} [0-9a-f]{4} [0-9a-f]{4} [0-9a-f]{4} [0-9a-f]{12}/g

/**
 * Breadcrumb trail atom — Magneto Design System.
 *
 * **a11y:** `<nav aria-label>` landmark; current page uses `aria-current="page"`; separators `aria-hidden`.
 *
 * Supports static text paths or server-driven links (SEO). Legacy domain props retained for consumers.
 */
const Component: React.FC<IBreadcrumb> = ({
  breadcrumbText,
  breadcrumbCustomText,
  queryParams,
  haveRedirect = true,
  detailTitle = '',
  breadCrumbFromServer,
  urlFromServer,
  className,
  'aria-label': ariaLabel = 'Breadcrumb'
}) => {
  const breadcrumbs = breadcrumbCustomText ?? breadcrumbText ?? ''
  const breadcrumbSplitText = breadcrumbs.split('/').filter(Boolean)
  const lastIndexBC = breadcrumbSplitText.length - 1
  const haveDetailTitle = detailTitle !== ''
  const title = breadcrumbSplitText[lastIndexBC]?.replace(/-/g, ' ').replace(UUID_IN_TITLE, '') ?? ''

  const breadCrumbsRender = useMemo(() => {
    if (haveRedirect && breadCrumbFromServer?.length) {
      return (
        <>
          {breadCrumbFromServer.map((label, i) => {
            const isLast = breadCrumbFromServer.length - 1 === i
            if (isLast) {
              return (
                <li
                  key={`${label}-${i}`}
                  className={cx(
                    'magneto-ui-breadcrumb__item',
                    'magneto-ui-breadcrumb__item--active',
                    haveDetailTitle ? 'magneto-ui-breadcrumb__item--no-transform' : undefined
                  )}
                  aria-current="page"
                >
                  <span className={cx('magneto-ui-breadcrumb__separator')} aria-hidden="true">
                    /
                  </span>
                  {haveDetailTitle ? detailTitle : title}
                </li>
              )
            }

            const href = `${urlFromServer?.[i] ?? ''}${queryParams ?? ''}`

            return (
              <li key={`${label}-${i}`} className={cx('magneto-ui-breadcrumb__item')}>
                <a className={cx('magneto-ui-breadcrumb__link')} href={href}>
                  <span className={cx('magneto-ui-breadcrumb__separator')} aria-hidden="true">
                    /
                  </span>
                  {label}
                </a>
              </li>
            )
          })}
        </>
      )
    }

    return breadcrumbSplitText.map((segment, i) => {
      const isActive = lastIndexBC === i

      return (
        <li
          key={`${segment}-${i}`}
          className={cx(
            'magneto-ui-breadcrumb__item',
            isActive ? 'magneto-ui-breadcrumb__item--active' : 'magneto-ui-breadcrumb__item--static'
          )}
          aria-current={isActive ? 'page' : undefined}
        >
          {i > 0 && (
            <span className={cx('magneto-ui-breadcrumb__separator')} aria-hidden="true">
              /
            </span>
          )}
          {segment}
        </li>
      )
    })
  }, [
    breadCrumbFromServer,
    breadcrumbSplitText,
    detailTitle,
    haveDetailTitle,
    haveRedirect,
    lastIndexBC,
    queryParams,
    title,
    urlFromServer
  ])

  return (
    <nav data-lib="magneto-ui" data-slot="breadcrumb" aria-label={ariaLabel} className={className}>
      <ol className={cx('magneto-ui-breadcrumb')}>{breadCrumbsRender}</ol>
    </nav>
  )
}

export const Breadcrumb = Component
