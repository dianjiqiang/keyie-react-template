import classNames from 'classnames'
import React, { memo } from 'react'
import type { ReactNode } from 'react'

export interface TabsItemType {
  children?: ReactNode
  keyId: string | number
  label: string
  className?: string
  currentKeys?: string | number
}

const TabsItem: React.FC<TabsItemType> = memo(({ children, keyId, className, currentKeys }) => {
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

TabsItem.displayName = 'TabsItem'

export default TabsItem
