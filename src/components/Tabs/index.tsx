import classNames from 'classnames'
import React, { memo, useCallback, Children, cloneElement, useState, FunctionComponentElement, useRef } from 'react'
import type { ReactNode, HTMLAttributes } from 'react'
import type { TabsItemType } from '../TabsItem'

interface TabsType {
  children: ReactNode[]
  defaultKey?: string | number
  className?: string
  onSelect?: (keyId: string | number) => any
  type?: 'line' | 'card'
}

type basicTabsType = TabsType & HTMLAttributes<HTMLElement>

const Tabs: React.FC<basicTabsType> = memo(({ children, defaultKey, className, onSelect, type, ...restProps }) => {
  const classes = classNames(className, 'keyie-tabs', {
    ['keyie-tabs-' + type]: type
  })
  const [currentKeys, setCurrentKeys] = useState(defaultKey)
  const firstEntry = useRef(true)
  const renderChildren = useCallback(() => {
    return Children.map(children, (child) => {
      const childElement = child as FunctionComponentElement<TabsItemType>
      const { displayName } = childElement.type
      if (displayName === 'TabsItem') {
        if (!defaultKey && firstEntry.current) {
          setCurrentKeys(childElement.props.keyId)
          console.warn('Warning: Tabs Wish to have defaultKeysAttribute')
        }
        firstEntry.current = false
        return cloneElement(childElement, { currentKeys })
      } else {
        console.error('Warning: Tabs has a child which is not TabsItem component')
      }
    })
  }, [children, currentKeys, defaultKey])
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
            className={classNames('keyie-tabs-item', {
              'keyie-currentItem': currentKeys === item.props.keyId,
              'keyie-tabitem-disabled': item.props.disabled
            })}
            {...restProps}
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
