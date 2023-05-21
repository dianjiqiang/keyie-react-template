import React, {
  memo,
  FunctionComponentElement,
  useContext,
  useCallback,
  Children,
  useState,
  cloneElement,
  useRef,
  useEffect
} from 'react'
import type { ReactNode } from 'react'
import classNames from 'classnames'
import { MenuContext } from '../Menu'
import { MenuItemType } from '../MenuItem'
import Icon from '../Icon'
// import { CSSTransition } from 'react-transition-group'
import Transition from '../Transition'

interface SubMenuType {
  children?: ReactNode
  className?: string
  keyId?: number | string
  title: string | ReactNode
}

const SubMenu: React.FC<SubMenuType> = memo((props) => {
  const { children, keyId, title, className } = props
  const liRefs = useRef<HTMLElement>()
  const context = useContext(MenuContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const classes = classNames('keyie-menu-item keyie-submenu-item', className, {
    'is-active': context.keyId === keyId,
    'is-vertical': context.mode === 'vertical'
  })
  const subMenuClasses = classNames('keyie-submenu', {
    'menu-opened': menuOpen
  })
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      setMenuOpen(!menuOpen)
      e.preventDefault()
    },
    [menuOpen]
  )
  const handleClickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick
        }
      : ''
  const handleMouseEvents =
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          }
        }
      : ''
  useEffect(() => {
    liRefs.current!.classList.remove('is-active')
  }, [context.isClear])
  const renderChildren = useCallback(() => {
    const chilrenComponent = Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemType>
      if (childElement.type.displayName === 'MenuItem') {
        return cloneElement(childElement, {
          handleEmitClick: (keyId: string | number) => {
            // 判断是否 不是 纵向 如果不是 给父组件也添加上current
            if (context.mode !== 'vertical') {
              liRefs.current!.classList.add('is-active')
            }
          }
        })
      } else {
        console.log('Warning: Menu has a child which is not MenuItem component')
      }
    })
    return (
      <Transition in={menuOpen} timeout={300} classNames={'zoom-in-top'}>
        <ul className={subMenuClasses}>{chilrenComponent}</ul>
      </Transition>
    )
  }, [children, subMenuClasses, context.mode, menuOpen])
  return (
    <li key={keyId} className={classes} ref={liRefs as HTMLElement | any} {...handleMouseEvents}>
      <div className={classNames('submenu-title', { menuOpen })} {...handleClickEvents}>
        <span>{title}</span>
        <Icon className="keyie-submenu-icon" icon="angle-down"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
})

SubMenu.displayName = 'SubMenu'

export default SubMenu
