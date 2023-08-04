'use client'
import { useState } from "react"


export const SearchName = () => {
    const [skin, setSkin] = useState('')

    function searchSkin(e){
        setSkin(e.target.value)
        if(e.target.value.length > 0){
            localStorage.setItem('skin', `/name=${e.target.value}`)
        } else {
            localStorage.setItem('skin', e.target.value)
        }
    }
  return (
    <input
        className="input"
        type="text"
        placeholder="поиск по названию..."
        value={skin}
        onChange={searchSkin}
        
    />
  )
}
