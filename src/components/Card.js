import cardBack from "../images/bg-card-back.png";
import cardFront from "../images/bg-card-front.png";
import cardLogo from "../images/card-logo.svg";
import scss from "../styles/Card.module.scss";

function Card({ data }) {
  return (
    <div className={scss.wrapper}>
      <div className={scss.back}>
        <img src={cardBack} alt="" />
        <output className={scss.cvc} form="card_detail_form" htmlFor="cvc">
          {data.cvc || "000"}
        </output>
      </div>
      <div className={scss.front}>
        <img src={cardFront} alt="" />
        <img src={cardLogo} alt="" className={scss.logo} />
        <output
          className={scss.card_no}
          form="card_detail_form"
          htmlFor="number"
        >
          {data.number || "0000 0000 0000 0000"}
        </output>
        <output
          className={scss.card_name}
          form="card_detail_form"
          htmlFor="name"
        >
          {data.name || "Jane Appleseed"}
        </output>
        <output
          className={scss.expiry_date}
          form="card_detail_form"
          htmlFor="exp_month exp_year"
        >
          {data.expMonth || "00"}/{data.expYear || "00"}
        </output>
      </div>
    </div>
  );
}

export default Card;
