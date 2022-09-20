import { useState } from "react";

import scss from "../styles/CardDetailForm.module.scss";

function CardDetailForm({ data, onChange, onValidate }) {
  const [touched, setTouched] = useState({
    name: false,
    number: false,
    cvc: false,
    expMonth: false,
    expYear: false,
  });
  const [error, setError] = useState({
    name: null,
    number: null,
    cvc: null,
    expMonth: null,
    expYear: null,
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(touched).every((key) => touched[key] && !error[key]))
      onValidate();
  }

  function validateFormData() {
    for (let input of Object.keys(data))
      if (data[input] === "" && touched[input])
        setError((prev) => ({ ...prev, [input]: "Can't be blank" }));
      else setError((prev) => ({ ...prev, [input]: null }));

    if (data.number !== "" && data.number.length < 16)
      setError((prev) => ({ ...prev, number: "Wrong format, too short" }));

    if (data.cvc !== "" && data.cvc.length < 3)
      setError((prev) => ({ ...prev, cvc: "Wrong format, too short" }));

    ["number", "cvc", "expMonth", "expYear"].forEach((input) => {
      if (!/^[\d\s]*$/.test(data[input]))
        setError((prev) => ({
          ...prev,
          [input]: "Wrong format, numbers only",
        }));
    });

    if (data.expMonth !== "" && (data.expMonth > 12 || data.expMonth < 1))
      setError((prev) => ({ ...prev, expMonth: "Invalid value" }));
  }

  return (
    <form
      className={scss.form}
      id="card_detail_form"
      onSubmit={handleSubmit}
      noValidate={true}
    >
      <div className={scss.inputs}>
        <div className={scss.name}>
          <label htmlFor="name">Cardholder Name</label>
          <div
            className={`${scss.input_wrapper} ${
              error.name ? scss.input_error : ""
            }`}
          >
            <input
              type="text"
              placeholder="e.g. Jane Appleseed"
              id="name"
              value={data.name}
              onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
              onChange={(e) =>
                onChange({
                  name: e.target.value.replace(/^\s+/, ""),
                })
              }
              onBlur={(e) => {
                onChange({ name: e.target.value.trim() });
                validateFormData();
              }}
            />
          </div>
          {error.name && <p className={scss.error_message}>{error.name}</p>}
        </div>
        <div className={scss.number}>
          <label htmlFor="number">Card Number</label>
          <div
            className={`${scss.input_wrapper} ${
              error.number ? scss.input_error : ""
            }`}
          >
            <input
              placeholder="e.g. 1234 5678 9123 0000"
              id="number"
              value={data.number}
              onFocus={() => setTouched((prev) => ({ ...prev, number: true }))}
              onChange={(e) =>
                onChange({
                  number: e.target.value.replace(/(\d{4})(\d)/g, "$1 $2"),
                })
              }
              onBlur={validateFormData}
              maxLength={19}
            />
          </div>
          {error.number && <p className={scss.error_message}>{error.number}</p>}
        </div>
        <div className={scss.inputs__grid}>
          <p className={scss.label}>
            <abbr title="Expiry">Exp.</abbr> Date{" "}
            <span aria-hidden="true">(MM/YY)</span>
          </p>
          <div>
            <fieldset className={scss.exp_date}>
              <div
                className={`${scss.input_wrapper} ${
                  error.expMonth ? scss.input_error : ""
                }`}
              >
                <input
                  placeholder="MM"
                  aria-label="month of expiry"
                  id="exp_month"
                  value={data.expMonth}
                  onFocus={() =>
                    setTouched((prev) => ({ ...prev, expMonth: true }))
                  }
                  onChange={(e) => onChange({ expMonth: e.target.value })}
                  onBlur={(e) => {
                    if (parseInt(e.target.value, 10))
                      onChange({ expMonth: e.target.value.padStart(2, "0") });
                    validateFormData();
                  }}
                  maxLength={2}
                />
              </div>
              <div
                className={`${scss.input_wrapper} ${
                  error.expYear ? scss.input_error : ""
                }`}
              >
                <input
                  placeholder="YY"
                  aria-label="year of expiry"
                  id="exp_year"
                  value={data.expYear}
                  onFocus={() =>
                    setTouched((prev) => ({ ...prev, expYear: true }))
                  }
                  onChange={(e) => onChange({ expYear: e.target.value })}
                  onBlur={(e) => {
                    if (parseInt(e.target.value, 10))
                      onChange({ expYear: e.target.value.padStart(2, "0") });
                    validateFormData();
                  }}
                  maxLength={2}
                />
              </div>
            </fieldset>
            {(error.expYear || error.expMonth) && (
              <p className={scss.error_message}>
                {error.expMonth || error.expYear}
              </p>
            )}
          </div>
          <label htmlFor="cvc">
            <abbr title="Card Verification Code">CVC</abbr>
          </label>
          <div>
            <div
              className={`${scss.input_wrapper} ${
                error.cvc ? scss.input_error : ""
              }`}
            >
              <input
                placeholder="e.g. 123"
                id="cvc"
                value={data.cvc}
                onFocus={() => setTouched((prev) => ({ ...prev, cvc: true }))}
                onChange={(e) => onChange({ cvc: e.target.value })}
                onBlur={validateFormData}
                maxLength={3}
              />
            </div>
            {error.cvc && <p className={scss.error_message}>{error.cvc}</p>}
          </div>
        </div>
      </div>
      <button className={scss.button}>Confirm</button>
    </form>
  );
}

export default CardDetailForm;
