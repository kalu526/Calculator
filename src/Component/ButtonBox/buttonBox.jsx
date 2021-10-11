import React from 'react'
import './buttonbox.css'
export default function ButtonBox({children}) {
    return (
        <div className="buttonBox">
           {children} 
        </div>
    )
}
