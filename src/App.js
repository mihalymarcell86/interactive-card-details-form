import { useState } from "react";

import Card from "./components/Card";
import CardDetailForm from "./components/CardDetailForm";
import Success from "./components/Success";
import Attribution from "./components/Attribution";

import scss from "./styles/App.module.scss";

function App() {
  const defaultCardDetails = {
    name: "",
    number: "",
    cvc: "",
    expMonth: "",
    expYear: "",
  };

  const [cardIsValid, setCardIsValid] = useState(false);
  const [cardDetails, setCardDetails] = useState(defaultCardDetails);

  function updateCardDetails(updatedData) {
    setCardDetails((prev) => ({ ...prev, ...updatedData }));
  }

  function reset() {
    setCardDetails(defaultCardDetails);
    setCardIsValid(false);
  }

  return (
    <>
      <main className={scss.main}>
        <Card data={cardDetails} />
        {cardIsValid ? (
          <Success onReset={reset} />
        ) : (
          <CardDetailForm
            data={cardDetails}
            onChange={updateCardDetails}
            onValidate={() => setCardIsValid(true)}
          />
        )}
      </main>
      <Attribution />
    </>
  );
}

export default App;
