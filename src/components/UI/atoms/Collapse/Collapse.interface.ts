export type CollapsePanelVariant = 'dark'

export type TCollapse = React.HTMLAttributes<HTMLDivElement> &
  Partial<ICollapseContext> & {
    /** Optional preset panel surface (e.g. dark header panels). */
    panelVariant?: CollapsePanelVariant
  }

export interface ICollapseContext {
  defaultOpen?: boolean
  open: boolean
  onChangeOpen: (open: boolean) => void
}
