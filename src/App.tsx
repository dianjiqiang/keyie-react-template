import React, { memo } from 'react'
import type { ReactNode } from 'react'

// import Button from './components/Button'
// import Alert from './components/Alert'
// import Title from './components/Title'
// import Divider from './components/Divider'
// import Menu from './components/Menu'
// import MenuItem from './components/MenuItem'
// import SubMenu from './components/SubMenu'
// import Tabs from './components/Tabs'
// import TabsItem from './components/TabsItem'

interface AppType {
  children?: ReactNode
}

const App: React.FC<AppType> = memo(() => {
  return <div style={{ padding: '100px' }}></div>
})

App.displayName = 'App'

export default App
