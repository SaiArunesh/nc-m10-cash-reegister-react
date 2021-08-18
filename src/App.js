import "./styles.css";
import { useState } from "react";

export default function App() {
  const [retAmount, setRetAmount] = useState({
    "2000": 0,
    "500": 0,
    "100": 0,
    "20": 0,
    "10": 0,
    "5": 0,
    "1": 0
  });

  const [billAmount, setBillAmount] = useState("");
  const [cashGiven, setCashGiven] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [enableCashGiven, setEnableCashGiven] = useState(false);
  const [enableButton, setEnableButton] = useState(false);

  function billAmountChangeHandler(event) {
    setShowTable(false);

    setRetAmount({
      "2000": 0,
      "500": 0,
      "100": 0,
      "20": 0,
      "10": 0,
      "5": 0,
      "1": 0
    });

    if (event.target.value === "") {
      setEnableCashGiven(false);
      setEnableButton(false);
      setFieldError("");
      return;
    }

    let bill = Number(event.target.value);

    if (bill < 0) {
      setEnableCashGiven(false);
      setEnableButton(false);
      setFieldError("Invalid Bill Amount");
      return;
    }
    setEnableCashGiven(true);

    setFieldError("");
    setBillAmount(event.target.value);
  }

  function cashGivenChangeHandler(event) {
    setShowTable(false);
    setEnableButton(false);
    let cash = Number(event.target.value);

    if (event.target.value === "") {
      setFieldError("");
      return;
    }

    if (cash < 0) {
      setFieldError("Invalid Cash Amount");
      return;
    }
    setRetAmount({
      "2000": 0,
      "500": 0,
      "100": 0,
      "20": 0,
      "10": 0,
      "5": 0,
      "1": 0
    });
    setEnableButton(true);
    setFieldError("");
    setCashGiven(event.target.value);
  }

  function calculateChange() {
    let bill = Number(billAmount);
    let cash = Number(cashGiven);

    let balance = cash - bill;

    if (balance === 0) {
      setFieldError("No change to be returned");
      return;
    }

    if (balance < 0) {
      setFieldError("Cash Given is less than bill amount");
      return;
    }

    let denominations = Object.keys(retAmount);
    let returnAmount = Object.assign({}, retAmount);

    for (let i = denominations.length - 1; i >= 0; i--) {
      returnAmount[denominations[i]] = Math.floor(balance / denominations[i]);
      balance = balance - denominations[i] * returnAmount[denominations[i]];
    }

    setRetAmount(returnAmount);

    setShowTable(true);
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
        Enter the bill amount and cash given to find change to be returned
      </h2>

      <label>
        Enter Bill Amount
        <input type="number" onChange={billAmountChangeHandler}></input>
      </label>

      {enableCashGiven && (
        <label>
          Enter Cash Given
          <input type="number" onChange={cashGivenChangeHandler}></input>
        </label>
      )}

      {enableButton && <button onClick={calculateChange}>CALCULATE</button>}

      {showTable && (
        <table>
          <tr>
            <th>No of Notes</th>
            {Object.keys(retAmount).map((count) => (
              <td>{count}</td>
            ))}
          </tr>
          <tr>
            <th>Note</th>
            {Object.keys(retAmount).map((value) => (
              <td>{retAmount[value]}</td>
            ))}
          </tr>
        </table>
      )}

      {fieldError !== "" && <p className="error">{fieldError}</p>}
    </div>
  );
}
