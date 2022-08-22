import iconComplete from "../images/icon-complete.svg";
import scss from "../styles/Success.module.scss";

function Success() {
  return (
    <div className={scss.wrapper}>
      <img src={iconComplete} alt="" className={scss.icon} />
      <h1 className={scss.thank_you}>Thank you!</h1>
      <p className={scss.paragraph}>We've added your card details</p>
      <button className={scss.button}>Continue</button>
    </div>
  );
}

export default Success;
