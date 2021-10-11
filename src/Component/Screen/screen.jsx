import React from 'react'
import './screen.css';
import { Textfit } from "react-textfit";
export default function Screen({value}) {
    return (
       <Textfit className="screen" mode="single" max={70}>
           {value}
       </Textfit>
    )
}
