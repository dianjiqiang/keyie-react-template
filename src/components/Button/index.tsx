import React, { memo } from 'react'
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, CSSProperties } from 'react'
import classNames from 'classnames'

type ButtonSize = 'lg' | 'sm'

type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface ButtonComponentsType {
  children?: ReactNode
  className?: string
  size?: ButtonSize
  disabled?: boolean
  btnType?: ButtonType
  href?: string
  style?: CSSProperties
}

type NativeButtonProps = ButtonHTMLAttributes<HTMLElement> & ButtonComponentsType
type NativeAnchorProps = AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeAnchorProps & NativeButtonProps>

const Button: React.FC<ButtonProps> = memo((props) => {
  const { children, className, size, btnType, disabled, href, style, ...restProps } = props

  const classes = classNames(
    'btn',
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      disabled: btnType === 'link' && disabled
    },
    className
  )
  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classes} {...restProps} style={style}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
})
Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}
Button.displayName = 'Button'

export default Button
