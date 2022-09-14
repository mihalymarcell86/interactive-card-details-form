import { useState } from "react";

import scss from "../styles/CardDetailForm.module.scss";

function CardDetailForm({ data, onChange }) {
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
  }

  function validateFormData() {
    for (let input of Object.keys(data))
      if (data[input] === "" && touched[input])
        setError((prev) => ({ ...prev, [input]: "Can't be blank" }));
      else setError((prev) => ({ ...prev, [input]: null }));

    ["number", "cvc", "expMonth", "expYear"].forEach((input) => {
      if (!/^[\d\s]*$/.test(data[input]))
        setError((prev) => ({
          ...prev,
          [input]: "Wrong format, numbers only",
        }));
    });

    if (data.cvc !== "" && data.cvc.length < 3)
      setError((prev) => ({ ...prev, cvc: "Wrong format, too short" }));

    console.log(error);
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
          <div className={scss.input_wrapper}>
            <input
              type="text"
              placeholder="e.g. Jane Appleseed"
              id="name"
              value={data.name}
              onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
              onChange={(e) => onChange({ name: e.target.value })}
              onBlur={validateFormData}
            />
          </div>
        </div>
        <div className={scss.number}>
          <label htmlFor="number">Card Number</label>
          <div className={scss.input_wrapper}>
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
        </div>
        <div>
          <fieldset className={scss.exp_date}>
            <legend>
              <abbr title="Expiry">Exp.</abbr> Date{" "}
              <span aria-hidden="true">(MM/YY)</span>
            </legend>
            <div className={scss.input_wrapper}>
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
            <div className={scss.input_wrapper}>
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
        </div>
        <div className={scss.cvc}>
          <label htmlFor="cvc">
            <abbr title="Card Verification Code">CVC</abbr>
          </label>
          <div className={scss.input_wrapper}>
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
        </div>
      </div>
      <button className={scss.button}>Confirm</button>
    </form>
  );
}

export default CardDetailForm;
