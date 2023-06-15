import React, { CSSProperties, ChangeEvent, InputHTMLAttributes, memo, useCallback } from 'react'
import type { ReactNode } from 'react'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../Icon'

export type SizeType = 'lg' | 'sm'
export type PositionType = 'left' | 'right'

export interface InputType extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  children?: ReactNode
  disabled?: boolean
  icon?: IconName
  size?: SizeType
  prepend?: ReactNode | string
  iconPosition?: PositionType
  append?: ReactNode | string
  className?: string
  style?: CSSProperties
  value: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any
  onIconClick?: () => any
}

const Input: React.FC<InputType> = memo((props) => {
  const { disabled, icon, size, prepend, append, className, style, iconPosition, onIconClick, onChange, ...restProps } =
    props
  const classes = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  const iconClick = useCallback(() => {
    if (onIconClick) onIconClick()
  }, [onIconClick])
  if ('value' in props) {
    delete restProps.defaultValue
  }
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e)
      }
    },
    [onChange]
  )
  return (
    <div className={classes} style={style}>
      {prepend && <div className={'viking-input-group-prepend'}>{prepend}</div>}
      {icon && (
        <div className={classNames('icon-wrapper', `icon-position-${iconPosition}`)} onClick={iconClick}>
          <Icon icon={icon}></Icon>
        </div>
      )}
      <input className="viking-input-inner" disabled={disabled} {...restProps} onChange={(e) => handleInputChange(e)} />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
})

Input.defaultProps = {
  iconPosition: 'left',
  value: ''
}
Input.displayName = 'Input'

export default Input
