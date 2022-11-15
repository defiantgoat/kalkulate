import { useState } from "react";
import { add, subtract, multiply, divide } from "../utils";
import "./Kalkulator.css";

const OPERATION_MAP = {
  "+": add,
  "-": subtract,
  "/": divide,
  "*": multiply
};

const Kalkulator = () => {
  const [currentReadout, setCurrentReadout] = useState<string>("");
  const [operations, setOperations] = useState<[string|null, "+"|"-"|"/"|"*"|null, string|null, number|null]>([null, null, null, null]);

  const formatFunction = () => {
    const [value1, operation, value2, result] = operations;

    const formattedFunction = `${value1 || ""} ${operation || ""} ${value2 || ""}`;
    if (result) {
      return `${formattedFunction} = ${result}`;
    }

    return formattedFunction;
  }

  const clearInput = () => {
    if (currentReadout === "") {
      // clear everyting
      setOperations([null, null, null, null]);
    } else {
      setCurrentReadout("");
    }
  };

  const createOperation = ({target: {innerHTML}}: any) => {
    setOperations([currentReadout, innerHTML, null, null]);
    setCurrentReadout("");
  };

  const calculate = () => {
    const [value1, operation] = operations;
    if (!operation || !value1 || currentReadout === "") {
      return;
    }

    const operationFunction = OPERATION_MAP[operation];
    const result = operationFunction(parseInt(value1, 10), parseInt(currentReadout, 10));
    setOperations([value1, operation, currentReadout, result]);
    setCurrentReadout(`${result}`);
  };

  const setInput = ({target: {innerHTML}}: any) => {
    const value = `${currentReadout}${innerHTML}`;
    setCurrentReadout(value);
  };

  return (
    <div className="kalkulator">
      <div className="readout">
        <div className="currentInput">{currentReadout}</div>
        <div className="function">{
          formatFunction()
        }</div>
      </div>
      <div className="buttons">
        <div className="keypad">
          <div className="row">
            <button onClick={setInput}>7</button>
            <button onClick={setInput}>8</button>
            <button onClick={setInput}>9</button>
          </div>
          <div className="row">
            <button onClick={setInput}>4</button>
            <button onClick={setInput}>5</button>
            <button onClick={setInput}>6</button>
          </div>
          <div className="row">
            <button onClick={setInput}>1</button>
            <button onClick={setInput}>2</button>
            <button onClick={setInput}>3</button>
          </div>
          <div className="row">
            <button onClick={setInput}>0</button>
            {/* <button onClick={setInput}>.</button> */}
          </div>
          <div className="row">
            <button className="less-emphasis" onClick={clearInput}>Clear</button>
          </div>
        </div>
        <div className="operators">
          <button onClick={createOperation}>/</button>
          <button onClick={createOperation}>*</button>
          <button onClick={createOperation}>-</button>
          <button onClick={createOperation}>+</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Kalkulator;
