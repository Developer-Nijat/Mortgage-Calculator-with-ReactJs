import { useEffect, useState } from "react";

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTerm, setLoanTerm] = useState(0);
  const [initialPayment, setInitialPayment] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    calculateMonthlyPayment();
  }, [loanAmount, interestRate, loanTerm, initialPayment]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "loanAmount") {
      setLoanAmount(value);
    } else if (name === "interestRate") {
      setInterestRate(value);
    } else if (name === "loanTerm") {
      setLoanTerm(value);
    } else if (name === "initialPayment") {
      setInitialPayment(value);
    }
  };

  const calculateMonthlyPayment = () => {
    if (!loanAmount || !loanTerm || !initialPayment) {
      return;
    }
    // Perform the mortgage calculation here
    // Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const principal = parseFloat(loanAmount) - parseFloat(initialPayment);
    setPrincipal(principal);
    const interest = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;

    const monthlyPayment =
      (principal * interest * Math.pow(1 + interest, term)) /
      (Math.pow(1 + interest, term) - 1);

    const value =
      monthlyPayment && monthlyPayment !== Infinity
        ? monthlyPayment.toFixed(2)
        : 0;
    setMonthlyPayment(value);
  };

  const clearForm = () => {
    setLoanAmount(0);
    setInterestRate(8);
    setLoanTerm(0);
    setInitialPayment(0);
    setPrincipal(0);
    setMonthlyPayment(0);
  };

  const totalPaidPayments = (
    Number(loanTerm) *
    12 *
    Number(monthlyPayment)
  ).toFixed(2);

  return (
    <div>
      <h2 className="text-center mt-4">İpoteka kalkulyatoru</h2>
      <p className="text-center mt-0 mb-0">
        <small className="text-muted">Developed by Nijat Aliyev</small>
      </p>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="loanAmount" className="form-label">
              Mənzilin dəyəri
            </label>
            <input
              className="form-control"
              type="number"
              id="loanAmount"
              name="loanAmount"
              value={loanAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="interestRate" className="form-label">
              Faiz dərəcəsi (%)
            </label>
            <input
              className="form-control"
              type="number"
              id="interestRate"
              name="interestRate"
              value={interestRate}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loanTerm" className="form-label">
              Kredit müddəti (illər)
            </label>
            <input
              className="form-control"
              type="number"
              id="loanTerm"
              name="loanTerm"
              value={loanTerm}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="initialPayment" className="form-label">
              İlkin Ödəniş
            </label>
            <input
              className="form-control"
              type="number"
              id="initialPayment"
              name="initialPayment"
              value={initialPayment}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <p className="h2 mb-0">
            {principal} <i className="fa-solid fa-manat-sign"></i>
          </p>
          <p>Kredit məbləği</p>
          <hr />
          <p className="h2 mb-0">
            {monthlyPayment} <i className="fa-solid fa-manat-sign"></i>
          </p>
          <p>Aylıq ödəniş</p>
          <hr />
          <p className="h2 mb-0">
            {Number(initialPayment) + Number(totalPaidPayments)}{" "}
            <i className="fa-solid fa-manat-sign"></i>
          </p>
          <p>Yekun məbləğ</p>
          <hr />
          {Boolean(monthlyPayment) && (
            <button onClick={clearForm} type="button" className="btn btn-light">
              Təmizlə
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
