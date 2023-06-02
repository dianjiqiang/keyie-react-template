import React, { InputHTMLAttributes, memo } from 'react'
import type { ReactNode, HTMLAttributes } from 'react'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'

export type SizeType = 'lg' | 'sm'
export type PositionType = 'left' | 'right'

export interface InputType extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  children?: ReactNode
  disabled?: boolean
  icon?: IconName
  size?: SizeType
  prepand?: ReactNode | string
  append?: ReactNode | string
  className?: string
}

const Input: React.FC<InputType> = memo((props) => {
    const { disabled, icon, size, prepand, append, className, ...restProps } = props
    const classes = classNames('keyie-input', {
      'keyie-input-disabled': disabled
    })
    return <input className={classes} {...restProps} type="text" />
  }
)

Input.displayName = 'Input'

export default Input
