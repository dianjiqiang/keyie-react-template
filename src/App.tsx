import React, { ChangeEvent, memo, useCallback, useState } from 'react'
import type { ReactNode } from 'react'

// import Button from './components/Button'
// import Alert from './components/Alert'
// import Title from './components/Title'
// import Divider from './components/Divider'
// import Menu from './components/Menu'
// import SubMenu from './components/SubMenu'
// import MenuItem from './components/MenuItem'
// import Tabs from './components/Tabs'
// import TabsItem from './components/TabsItem'
// import Icon from './components/Icon'
// import Input from './components/Input'
import AutoComplete from './components/AutoComplete'

interface AppType {
  children?: ReactNode
}

const lakers = ['张三', '李四', '王五', '张六']

const App: React.FC<AppType> = memo(() => {
  const [inputValue, setInputValue] = useState<string>()
  const handleFetch = useCallback((query: string) => {
    return lakers.filter((name) => name.includes(query))
  }, [])
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])
  return (
    <div style={{ padding: '100px' }}>
      <AutoComplete
        fetchSuggestions={(query) => handleFetch(query)}
        value={inputValue}
        onChange={handleInputChange}
      ></AutoComplete>
    </div>
  )
})

App.displayName = 'App'

export default App
