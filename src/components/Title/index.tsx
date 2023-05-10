import React, { memo } from 'react'
import type { ReactNode, HTMLAttributes } from 'react'
import classNames from 'classnames'

export const enum LevelType {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5
}

interface TitleType {
  children?: ReactNode
  level?: LevelType
  className?: string
}

type BasicTitleProps = TitleType & HTMLAttributes<HTMLElement>

const Title: React.FC<BasicTitleProps> = memo((props) => {
  const { children, level, className } = props
  const classes = classNames('keyie-title', className, `keyie-level-${level}`)
  switch (level) {
    case LevelType.Two:
      return <h2 className={classes}>{children}</h2>
    case LevelType.Three:
      return <h3 className={classes}>{children}</h3>
    case LevelType.Four:
      return <h4 className={classes}>{children}</h4>
    case LevelType.Five:
      return <h5 className={classes}>{children}</h5>
    default:
      return <h1 className={classes}>{children}</h1>
  }
})

Title.defaultProps = {
  level: LevelType.One
}
Title.displayName = 'Title'

export default Title
