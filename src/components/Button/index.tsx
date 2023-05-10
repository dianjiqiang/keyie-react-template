import React, { memo } from 'react'
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface ButtonComponentsType {
  children?: ReactNode
  className?: string
  size?: ButtonSize
  disabled?: boolean
  btnType?: ButtonType
  href?: string
}

type NativeButtonProps = ButtonHTMLAttributes<HTMLElement> & ButtonComponentsType
type NativeAnchorProps = AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeAnchorProps & NativeButtonProps>

const Button: React.FC<ButtonProps> = memo((props) => {
  const { children, className, size, btnType, disabled, href, ...restProps } = props

  const classes = classNames(
    'btn',
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      disabled: btnType === ButtonType.Link && disabled
    },
    className
  )
  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classes} {...restProps}>
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
  btnType: ButtonType.Default
}
Button.displayName = 'Button'

export default Button
