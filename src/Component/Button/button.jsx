import React from 'react'
import "./button.css"
export default function Button({className,value,onClick}) {
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    )
}
