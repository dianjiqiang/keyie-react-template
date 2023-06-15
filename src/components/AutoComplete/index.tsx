import React, { ChangeEvent, memo, useCallback, useState, ReactElement } from 'react'
import Input, { InputType } from '../Input'
import type { ReactNode } from 'react'

interface AutoCompleteType extends Omit<InputType, 'onSelect'> {
  children?: ReactNode
  fetchSuggestions: (str: string) => string[] | Promise<string[]>
  onSelect?: (item: string) => void
  renderOption?: (item: string) => ReactElement
}

const AutoComplete: React.FC<AutoCompleteType> = memo((props) => {
  const { fetchSuggestions, onSelect, value, onChange, renderOption, ...restProps } = props

  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()
      setInputValue(value)
      if (value) {
        const results = fetchSuggestions(value)
        if (results instanceof Promise) {
          results.then((res) => {
            setSuggestions(res)
          })
        } else {
          setSuggestions(results)
        }
      } else {
        setSuggestions([])
      }
      if (onChange) {
        onChange(e)
      }
    },
    [fetchSuggestions, onChange]
  )
  const handleSelect = useCallback(
    (item: string) => {
      setInputValue(item)
      setSuggestions([])
      if (onSelect) {
        onSelect(item)
      }
    },
    [onSelect]
  )
  const renderTemplate = useCallback(
    (item: string) => {
      return renderOption ? renderOption(item) : item
    },
    [renderOption]
  )
  const generateDropdown = useCallback(() => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }, [suggestions, handleSelect, renderTemplate])
  return (
    <div className="viking-auto-complete">
      <Input value={inputValue} {...restProps} onChange={handleChange}></Input>
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
})

AutoComplete.displayName = 'AutoComplete'

export default AutoComplete
