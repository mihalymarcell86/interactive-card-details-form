import scss from "../styles/CardDetailForm.module.scss";

function CardDetailForm() {
  return (
    <form className={scss.form} id="card_detail_form">
      <div className={scss.inputs}>
        <div className={scss.name}>
          <label htmlFor="name">Cardholder Name</label>
          <input type="text" placeholder="e.g. Jane Appleseed" id="name" />
        </div>
        <div className={scss.number}>
          <label htmlFor="number">Card Number</label>
          <input
            type="number"
            placeholder="e.g. 1234 5678 9123 0000"
            id="number"
          />
        </div>
        <div>
          <fieldset className={scss.exp_date}>
            <legend>
              <abbr title="Expiry">Exp.</abbr> Date{" "}
              <span aria-hidden="true">(MM/YY)</span>
            </legend>
            <input
              type="number"
              placeholder="MM"
              min="1"
              max="12"
              aria-label="month of expiry"
              id="exp_month"
            />
            <input
              type="number"
              placeholder="YY"
              aria-label="year of expiry"
              id="exp_year"
              max="99"
              min="00"
            />
          </fieldset>
        </div>
        <div className={scss.cvc}>
          <label htmlFor="cvc">
            <abbr title="Card Verification Code">CVC</abbr>
          </label>
          <input
            type="number"
            placeholder="e.g. 123"
            id="cvc"
            max="999"
            min="0"
          />
        </div>
      </div>
      <button className={scss.button}>Confirm</button>
    </form>
  );
}

export default CardDetailForm;