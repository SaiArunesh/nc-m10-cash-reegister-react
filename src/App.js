import "./styles.css";
import { useState } from "react";

export default function App() {
  const [fieldError, setFieldError] = useState("");
  const [cashGiven, setCashGiven] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [enableCashGiven, setEnableCashGiven] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [returnAmount, setReturnAmount] = useState({
    "2000": 0,
    "500": 0,
    "200": 0,
    "100": 0,
    "50": 0,
    "20": 0,
    "10": 0,
    "5": 0,
    "1": 0
  });

  function checkAmount(event, setAmount, setError) {
    resetChangeTable();
    setAmount(event.target.value);
    if (event.target.value === "0") {
      setError("Cash cannot be zero");
      return false;
    } else if (event.target.value < 0) {
      setAmount(0);
      setError("Cash cannot be zero");
      return false;
    } else {
      setError("");
      return true;
    }
  }

  function resetChangeTable() {
    let notes = Object.keys(returnAmount);
    let retAmnt = Object.assign({}, returnAmount);

    for (let i = 0; i < notes.length; i++) {
      retAmnt[notes[i]] = 0;
    }
    setReturnAmount(retAmnt);
    return [notes, retAmnt];
  }

  function onBillInputChange(event) {
    let status = checkAmount(event, setBillAmount, setFieldError);
    setEnableCashGiven(status);
    if (!status) {
      setCashGiven("");
    }
  }

  function onCashInputChange(event) {
    let status = checkAmount(event, setCashGiven, setFieldError);
    setShowSubmit(status);
  }

  function calculateChange() {
    const cash = parseInt(cashGiven, 10);
    const bill = parseInt(billAmount, 10);
    if (cash < bill) {
      setFieldError("Cash given is less than Bill Amount");
      return;
    } else {
      let balance = cash - bill;
      if (balance < 1) {
        setFieldError("No change to be returned");
        return;
      }
      let notes = [];
      let retAmnt = {};
      [notes, retAmnt] = resetChangeTable();

      for (let i = notes.length - 1; i >= 0; i--) {
        retAmnt[notes[i]] = Math.floor(balance / notes[i]);
        balance = balance - notes[i] * retAmnt[notes[i]];
      }
      setReturnAmount(retAmnt);
      setFieldError("");
    }
  }

  return (
    <div className="App">
      <h1 className="title">
        Cash Register App
        <img
          className="money-image"
          src="https://thumbs.dreamstime.com/b/dollar-money-icon-cash-sign-bill-symbol-flat-payment-dollar-currency-icon-dollar-money-icon-cash-sign-bill-symbol-flat-payment-147323372.jpg"
          alt="money"
        />
      </h1>
      <hr />
      <h2 className="title-desc">
        Enter the bill amount and cash given to know the desi change to be
        returned
      </h2>
      <label>
        Enter Bill Amount
        <input
          placeholder="Bill Amount"
          value={billAmount}
          onChange={onBillInputChange}
          type="number"
        />
      </label>

      {enableCashGiven && (
        <label>
          Enter Cash Given
          <input
            placeholder="Cash given by Customer"
            value={cashGiven}
            onChange={onCashInputChange}
            type="number"
          />
        </label>
      )}

      {cashGiven !== "" && showSubmit && (
        <button onClick={calculateChange}>Calculate</button>
      )}

      {fieldError === "" && showSubmit && (
        <table>
          <tbody>
            <tr>
              <th>No.of Notes</th>
              {Object.keys(returnAmount).map((val) => (
                <td key={val}>{returnAmount[val]}</td>
              ))}
            </tr>
            <tr>
              <th>Note</th>
              {Object.keys(returnAmount).map((val) => (
                <td key={val}>{val}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
      {fieldError !== "" && <p className="error">{fieldError}</p>}
    </div>
  );
}
