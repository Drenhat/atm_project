import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './App.css';

const ATMDeposit = ({ onChange, isDeposit, validTransaction}) => {
  let [isValid] = [validTransaction];
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <>
      <section className="menu-select"> {choice[Number(!isDeposit)]}</section>
      <label className="select-number">Select the amount</label>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>  
      <br/>
      <Button className="atm-button" variant="primary" type="submit" value="Submit" id="submit-input" disabled={!isValid}>
        Submit
      </Button>
      {/* <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input> */}
    </>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState(``)
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    setValidTransaction(false)
    if (event.target.value <= 0) {return}
    if (atmMode == `Cash Back` && event.target.value > totalState){
      setValidTransaction(false);
    }
    else {setValidTransaction(true)}
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    if (event.target.value == `Deposit`) setIsDeposit(true);
    if (event.target.value == `Cash Back`) setIsDeposit(false); 
  } 

  return (
    <form className="atm-form" onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label className="select-action">Select an action below to continue</label>
      <Form.Control as="select" size="lg" className="form-select" aria-label="Default select example" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </Form.Control>
      <br />
      {
        atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit}
        validTransaction={validTransaction}></ATMDeposit>
      }
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));


export default Account;
