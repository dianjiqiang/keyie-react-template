import React, { memo } from 'react'
import type { ReactNode } from 'react'

// import Button,{ButtonType, ButtonSize} from './components/Button'
// import Alert,{ AlertType } from './components/Alert'
// import Title,{LevelType} from './components/Title'
// import Divider, { DividerDirection } from './components/Divider'

interface AppType {
  children?: ReactNode
}

const App: React.FC<AppType> = memo(() => {
  return <div style={{ padding: '100px' }}></div>
})

App.displayName = 'App'

export default App
