import React, { ChangeEvent, memo, useCallback, useState } from 'react'
import Input, { InputType } from '../Input'
import type { ReactNode } from 'react'

interface AutoCompleteType extends Omit<InputType, 'onSelect'> {
  children?: ReactNode
  fetchSuggestions: (str: string) => string[]
  onSelect?: (item: string) => void
}

const AutoComplete: React.FC<AutoCompleteType> = memo((props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props

  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()
      setInputValue(value)
      if (value) {
        const results = fetchSuggestions(value)
        setSuggestions(results)
      } else {
        setSuggestions([])
      }
    },
    [fetchSuggestions]
  )
  return (
    <div className="viking-auto-complete">
      <Input value={value} {...restProps} onChange={handleChange}></Input>
    </div>
  )
})

AutoComplete.displayName = 'AutoComplete'

export default AutoComplete
