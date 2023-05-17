import React, { memo } from 'react'
import type { ReactNode, HTMLAttributes, CSSProperties } from 'react'
import classNames from 'classnames'

type DividerDirection = 'left' | 'right' | 'center'

interface DividerType {
  children?: ReactNode
  orientation?: DividerDirection
  className?: string
  dashed?: boolean
  style?: CSSProperties
}

type BasicDividerType = DividerType & HTMLAttributes<HTMLElement>

const Divider: React.FC<BasicDividerType> = memo((props) => {
  const { className, children, orientation, dashed, style } = props
  const classes = classNames('keyie-divider', className)
  const hrClasses = classNames('keyie-divider-hr', {
    'keyie-divider-dashed': dashed
  })
  const innerTextClasses = classNames('keyie-divider-text', {
    [`keyie-divider-${orientation}`]: children
  })
  return (
    <div className={classes} style={style}>
      {children ? (
        <div className={hrClasses}>
          <div className={innerTextClasses}>{children}</div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
})

Divider.defaultProps = {
  orientation: 'center',
  dashed: false
}
Divider.displayName = 'Divider'

export default Divider
