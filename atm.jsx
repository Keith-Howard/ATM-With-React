const ATMDeposit = ({ onChange, transMode, transAmount}) => {
  let showButton;
  if ((transAmount > 0) && (transMode !== '')) {
    showButton = true;
  } else {
    showButton = false;
  }
  return (
  <>
    <input type="number" width="200" onChange={onChange}></input>
    <input type="submit" width="200" value="Submit" disabled={!showButton}></input>
  </>
  );
};

const Account = () => {
  const [transAmount, setTransAmount] = React.useState(0);
  const [accountBalance, setAccountBalance] = React.useState(0);
  const [atmMode, setAtmMode] = React.useState("");

  let status = `Account Balance $ ${accountBalance} `;
  
  const handleChange = event => {
    console.log(`handleChange ${event.target.value}`);
    setTransAmount(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    if (atmMode !== '') {
      let newTotal = atmMode === 'deposit' ? accountBalance + transAmount : accountBalance - transAmount;
      if (newTotal >= 0) {
        setAccountBalance(newTotal);
      } else {
        alert("Insufficent Funds");
      }
      event.preventDefault();
    }
  };

  const handleAtmMode = (event) => {
    setAtmMode(event.target.value);
  }

  return (
    <div className="atm-container">
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <select onChange={handleAtmMode}>
          <option value=''></option>
          <option value='deposit'>Deposit</option>
          <option value='withdraw'>Withdraw</option>
        </select>
        <ATMDeposit onChange={handleChange} transMode={atmMode} transAmount={transAmount} ></ATMDeposit>
      </form>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
