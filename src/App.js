import "./styles.css";
import { useState } from "react";

export default function App() {
  const [cashGivenError, setCashGivenError] = useState("");
  const [billAmountError, setBillAmountError] = useState("");
  const [balanceError, setBalanceError] = useState("");
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
    setAmount(event.target.value);
    if (event.target.value === "0") {
      setError("Cash cannot be zero");
      setBalanceError("");
      return false;
    } else if (event.target.value < 0) {
      setAmount(0);
      setError("Cash cannot be zero");
      setBalanceError("");
      return false;
    } else {
      setError("");
      return true;
    }
  }

  function onBillInputChange(event) {
    let status = checkAmount(event, setBillAmount, setBillAmountError);
    setEnableCashGiven(status);
    if (!status) {
      setCashGiven("");
    }
  }

  function onCashInputChange(event) {
    let status = checkAmount(event, setCashGiven, setCashGivenError);
    setShowSubmit(status);
  }

  function calculateChange() {
    const cash = parseInt(cashGiven, 10);
    const bill = parseInt(billAmount, 10);
    if (cash < bill) {
      setBalanceError("Cash given is less than Bill Amount");
      return;
    } else {
      let balance = cash - bill;
      if (balance < 1) {
        setBalanceError("No change to be returned");
        return;
      }

      let notes = Object.keys(returnAmount);
      let retAmnt = Object.assign({}, returnAmount);

      for (let i = 0; i < notes.length; i++) {
        retAmnt[notes[i]] = 0;
      }

      for (let i = notes.length - 1; i >= 0; i--) {
        retAmnt[notes[i]] = Math.floor(balance / notes[i]);
        balance = balance - notes[i] * retAmnt[notes[i]];
      }
      setReturnAmount(retAmnt);
      setBalanceError("");
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
      {billAmountError !== "" && <p className="error">{billAmountError}</p>}
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
      {enableCashGiven && cashGivenError !== "" && (
        <p className="error">{cashGivenError}</p>
      )}
      {cashGiven !== "" && showSubmit && (
        <button onClick={calculateChange}>Calculate</button>
      )}
      {billAmountError === "" &&
        cashGivenError === "" &&
        showSubmit &&
        balanceError !== "" && <p className="error">{balanceError}</p>}
      {cashGivenError === "" &&
        billAmountError === "" &&
        showSubmit &&
        balanceError === "" && (
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
    </div>
  );
}
