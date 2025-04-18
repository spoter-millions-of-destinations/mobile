import { useState } from 'react'

export function useToggle<T>(initialValue: T, alternateValue: T): [T, () => void] {
    const [value, setValue] = useState<T>(initialValue)

    const toggle = () => {
        setValue((prev) => (prev === initialValue ? alternateValue : initialValue))
    }

    return [value, toggle]
}
