import classNames from 'classnames'
import React, { memo, useContext } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { MenuContext } from '../Menu'

export interface MenuItemType {
  children?: ReactNode
  disabled?: boolean
  className?: string
  style?: CSSProperties
  keyId?: string | number
  handleOtherClick?: () => void
  handleEmitClick?: (keyId: string | number) => any
}

const MenuItem: React.FC<MenuItemType> = memo((props) => {
  const { keyId, children, disabled, className, style, handleEmitClick, handleOtherClick } = props
  const context = useContext(MenuContext)
  const classes = classNames('keyie-menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.keyId === keyId
  })
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof keyId === 'number' || typeof keyId === 'string')) {
      context.onSelect(keyId)
    }
    if (handleEmitClick && keyId) {
      handleEmitClick(keyId)
    }
    if (handleOtherClick) {
      handleOtherClick()
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
})

MenuItem.defaultProps = {
  disabled: false
}
MenuItem.displayName = 'MenuItem'

export default MenuItem
