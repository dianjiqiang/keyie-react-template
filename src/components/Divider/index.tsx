import React, { memo } from 'react'
import type { ReactNode, HTMLAttributes } from 'react'
import classNames from 'classnames'

export const enum DividerDirection {
  Left = 'left',
  Right = 'Right',
  Center = 'center'
}

interface DividerType {
  children?: ReactNode
  orientation?: DividerDirection
  className?: string
  dashed?: boolean
}

type BasicDividerType = DividerType & HTMLAttributes<HTMLElement>

const Divider: React.FC<BasicDividerType> = memo((props) => {
  const { className, children, orientation, dashed } = props
  const classes = classNames('keyie-divider', className, {
    'keyie-divider-dashed': dashed,
    [`keyie-divider-${orientation}`]: children
  })
  return (
    <div className={classes}>
      {children ? (
        <div>
          <hr></hr>
          <div>{children}</div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
})

Divider.defaultProps = {
  orientation: DividerDirection.Center,
  dashed: false
}
Divider.displayName = 'Divider'

export default Divider
