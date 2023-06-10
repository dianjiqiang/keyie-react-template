import React, { memo } from 'react'
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, CSSProperties } from 'react'
import classNames from 'classnames'

type ButtonSize = 'lg' | 'sm'

type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface ButtonComponentsType extends Omit<ButtonHTMLAttributes<HTMLElement>, 'type'> {
  children?: ReactNode
  className?: string
  size?: ButtonSize
  disabled?: boolean
  type?: ButtonType
  href?: string
  style?: CSSProperties
}

type NativeButtonProps = ButtonComponentsType
type NativeAnchorProps = AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeAnchorProps & NativeButtonProps>

const Button: React.FC<ButtonProps> = memo((props) => {
  const { children, className, size, type, disabled, href, style, ...restProps } = props

  const classes = classNames(
    'btn',
    {
      [`btn-${type}`]: type,
      [`btn-${size}`]: size,
      disabled: type === 'link' && disabled
    },
    className
  )
  if (type === 'link' && href) {
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
  type: 'default'
}
Button.displayName = 'Button'

export default Button
