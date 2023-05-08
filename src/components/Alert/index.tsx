import React, { memo, useCallback, useState } from 'react'
import type { ReactNode, DialogHTMLAttributes } from 'react'
import classNames from 'classnames'

type AlertType = 'primary' | 'success' | 'danger' | 'warning'

interface AlertComponentType {
  children?: ReactNode
  title?: string
  description?: string
  type?: AlertType
  onClose?: () => void | boolean
  closable?: boolean
  className?: string
}

type BasicAlertType = DialogHTMLAttributes<HTMLElement> & AlertComponentType

const Alert: React.FC<BasicAlertType> = memo((props) => {
  const { children, title, description, type, onClose, closable, className, ...restProps } = props
  const [classes, setClasses] = useState(classNames('keyie-alert', className, { [`keyie-alert-${type}`]: type }))
  const [isDisplay, setIsDisplay] = useState(false)

  const closeAlert = useCallback(() => {
    let flag: boolean | void = true
    if (onClose) {
      flag = onClose() === false ? false : true
      console.log(onClose())
    }
    if (flag) {
      // 如果用户传递的是false 就不进行关闭操作
      setClasses(classes + ' keyie-alert-hidden')
      setTimeout(() => {
        setIsDisplay(true)
      }, 500)
    }
  }, [onClose, classes])
  if (!isDisplay) {
    return (
      <div className={classes} {...restProps}>
        <div className="keyie-alert-title">
          {title ? <span>{title}</span> : <span>{children}</span>}
          {closable ? (
            <span className="keyie-alert-close" onClick={closeAlert}>
              ×
            </span>
          ) : (
            ''
          )}
        </div>
        {description ? <div className="keyie-alert-description">{description}</div> : ''}
      </div>
    )
  } else {
    return <></>
  }
})
Alert.defaultProps = {
  type: 'primary',
  closable: true
}
Alert.displayName = 'Alert'

export default Alert
