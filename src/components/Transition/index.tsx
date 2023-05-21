import React, { memo } from 'react'
// import type { ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import type { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'
interface TransitionProps {
  animation?: AnimationName
  timeout?: number
}
type BasicTranstionProps = TransitionProps & CSSTransitionProps

const Transition: React.FC<BasicTranstionProps> = memo((props) => {
  const { children, classNames, animation, timeout = 300, ...restProps } = props
  return (
    <CSSTransition classNames={classNames ? classNames : animation} timeout={timeout} {...restProps}>
      {children}
    </CSSTransition>
  )
})

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}
Transition.displayName = 'Transition'

export default Transition
