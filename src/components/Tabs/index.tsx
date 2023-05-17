import classNames from 'classnames'
import React, { memo, useCallback, Children, cloneElement, useState, FunctionComponentElement } from 'react'
import type { ReactNode } from 'react'
import type { TabsItemType } from '../TabsItem'

interface TabsType {
  children: ReactNode[]
  defaultKey?: string | number
  className?: string
  onSelect?: (keyId: string | number) => any
  type?: 'line' | 'card'
}

const Tabs: React.FC<TabsType> = memo(({ children, defaultKey, className, onSelect, type }) => {
  const classes = classNames(className, 'keyie-tabs', {
    ['keyie-tabs-' + type]: type
  })
  const [currentKeys, setCurrentKeys] = useState(defaultKey)
  const renderChildren = useCallback(() => {
    return Children.map(children, (child) => {
      const childElement = child as FunctionComponentElement<TabsItemType>
      const { displayName } = childElement.type
      if (displayName === 'TabsItem') {
        return cloneElement(childElement, { currentKeys })
      } else {
        console.error('Warning: Menu has a child which is not MenuItem component')
      }
    })
  }, [children, currentKeys])
  const changeCurrentItemClick = useCallback(
    (keyId: string | number) => {
      setCurrentKeys(keyId)
      if (onSelect) {
        onSelect(keyId)
      }
    },
    [onSelect]
  )
  return (
    <div className={classes}>
      <div className="keyie-tabs-item-lines">
        {(children as FunctionComponentElement<TabsItemType>[]).map((item) => (
          <div
            key={item.props.keyId}
            onClick={() => changeCurrentItemClick(item.props.keyId)}
            className={classNames('keyie-tabs-item', { 'keyie-currentItem': currentKeys === item.props.keyId })}
          >
            {item.props.label}
          </div>
        ))}
      </div>
      {renderChildren()}
    </div>
  )
})

Tabs.defaultProps = {
  type: 'line'
}
Tabs.displayName = 'Tabs'

export default Tabs
