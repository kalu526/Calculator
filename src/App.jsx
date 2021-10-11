import logo from './logo.svg';
import './App.css';
import React ,{useState} from 'react'
import Wrapper from "./Component/Wrapper/wrapper.jsx";
import Screen from "./Component/Screen/screen.jsx";
import ButtonBox from "./Component/ButtonBox/buttonBox.jsx";
import Button from "./Component/Button/button.jsx";

function App() {
  const [calc,setcalc]=useState({
    sign:"",
    num:0,
    res:0,
  });
  const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];
  const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");
  const numClickHandler=(e)=>{
    e.preventDefault();
    const value = e.target.innerHTML;
    if(removeSpaces(calc.num).length < 16){
      setcalc({
        ...calc,
        num:
        calc.num === 0 && value==="0" ? "0"
        :removeSpaces(calc.num) % 1 ===0
        ?toLocaleString(Number(removeSpaces(calc.num + value)))
        :toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  }
  const commaClickHandler=(e)=>{
    e.preventDefault();
    const value = e.target.innerHTML;
    setcalc({
      ...calc,
      num:!calc.num.toString().includes(".") ? calc.num+value :calc.num,
    });
  }
  const signClickHandler=(e)=>{
    e.preventDefault();
    const value=e.target.innerHTML;
    setcalc({
      ...calc,
      sign:value,
      res: !calc.res && calc.num ? calc.num :calc.res,
      num:0,
    });
  }
  const equalsClickHandler=()=>{
    if(calc.num && calc.sign){
      const math=(a,b,sign)=>
         sign ==="+"
         ? a+b
         :sign ==="-"
         ? a-b
         :sign ==="X"
         ? a*b
        : a/b;

        setcalc({
          ...calc,
          res:calc.num ==="0" && calc.sign==="/"
          ? "number can not be divide"
          :toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
          sign:"",
          num:0,
        });
        
    }
  }
  const invertClickHandler=()=>{
    setcalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  }
  const percentClickHandler=()=>{
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setcalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    })
  }
  const resetClickHandler=()=>{
    setcalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    })
  }
  return (
 <div className="app">
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "C"
                    ? resetClickHandler
                    : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
 </div>

  );
}

export default App;
