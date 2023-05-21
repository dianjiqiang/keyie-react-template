import React, { memo, useEffect, useState } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIconProps, FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
export interface IconType extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IconType> = memo(({ className, theme, icon, ...restProps }) => {
  const [iconElement, setIconElement] = useState<IconProp>(icon)
  useEffect(() => {
    if (typeof icon === 'string') {
      const res = import('@fortawesome/free-solid-svg-icons')
      res.then((elements: any) => {
        if (elements) {
          let resultStr = ''
          const str = icon.split('-')
          for (let item of str) resultStr += item[0].toUpperCase() + item.slice(1, item.length)
          setIconElement(elements['fa' + resultStr])
        } else {
          console.error('warning: The icon name cannot be found')
        }
      })
    }
  }, [icon])
  const classes = classNames('keyie-icon', className, {
    [`keyie-icon-${theme}`]: theme
  })
  if (typeof iconElement === 'string') {
    return <></>
  }
  return <FontAwesomeIcon className={classes} {...restProps} icon={iconElement} />
})

Icon.displayName = 'Icon'

export default Icon
