import classNames from 'classnames'
import React, { memo } from 'react'
import type { ReactNode, HTMLAttributes } from 'react'

export interface TabsItemType {
  children?: ReactNode
  keyId: string | number
  label: string
  className?: string
  disabled?: boolean
  currentKeys?: string | number
}

type basicTabsItemType = TabsItemType & HTMLAttributes<HTMLElement>

const TabsItem: React.FC<basicTabsItemType> = memo(({ children, keyId, className, currentKeys }) => {
  const classes = classNames(className, { 'keyie-currentTabs': keyId === currentKeys })

  return (
    <>
      {currentKeys === keyId ? (
        <div className={classes}>
          <div>{children}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
})

TabsItem.defaultProps = {
  disabled: false
}
TabsItem.displayName = 'TabsItem'

export default TabsItem
