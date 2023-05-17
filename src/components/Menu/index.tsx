import React, { memo, createContext, useState, useCallback, useEffect, Children } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import classNames from 'classnames'
import { MenuItemType } from '../MenuItem'

type MenuMode = 'horizontal' | 'vertical'

type SelectCallback = (selectedKey: string | number) => any

interface IMenuContxt {
  keyId: string | number
  onSelect?: SelectCallback
  mode?: MenuMode
  isClear?: Number
}

interface MenuType {
  children?: ReactNode
  className?: string
  defaultKeyId?: string | number
  mode?: MenuMode
  width?: number | string
  style?: CSSProperties
  onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContxt>({ keyId: '0' })

const Menu: React.FC<MenuType> = memo((props) => {
  const { className, mode, defaultKeyId = 0, style = {}, onSelect, children, width } = props
  const [currentActive, setCurrentActive] = useState(defaultKeyId)
  const [isClear, setIsClear] = useState(Math.random)
  const [newWidth, setNewWidth] = useState(width)
  const classes = classNames('keyie-menu', className, {
    'keyie-menu-vertical': mode === 'vertical',
    'keyie-menu-horizontal': mode === 'horizontal'
  })
  const handleClick = useCallback(
    (keyId: string | number) => {
      setCurrentActive(keyId)
      if (onSelect) {
        onSelect(keyId)
      }
    },
    [onSelect]
  )
  useEffect(() => {
    if (mode === 'vertical') {
      if (!width) {
        setNewWidth(200)
      } else {
        setNewWidth(width)
      }
    }
  }, [width, mode])
  const passedContext: IMenuContxt = {
    keyId: currentActive,
    onSelect: handleClick,
    mode,
    isClear
  }
  const renderChildren = useCallback(() => {
    return Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemType>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        if (childElement.props.keyId === undefined) {
          console.error('Warning: MenuItem has a keyId attribute')
          return React.cloneElement(childElement, {
            keyId: index,
            handleOtherClick: () => {
              setIsClear(Math.random)
            }
          })
        }
        return React.cloneElement(childElement, {
          keyId: childElement.props.keyId,
          handleOtherClick: () => {
            setIsClear(Math.random)
          }
        })
      } else {
        console.error('Warning: Menu has a child which is not MenuItem component')
      }
    })
  }, [children])

  return (
    <ul className={classes} style={{ ...style, width: newWidth + 'px' }}>
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  )
})

Menu.defaultProps = {
  mode: 'horizontal'
}
Menu.displayName = 'Menu'

export default Menu
