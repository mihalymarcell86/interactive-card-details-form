import { useState } from "react";

import Card from "./components/Card";
import CardDetailForm from "./components/CardDetailForm";
import Success from "./components/Success";

import scss from "./styles/App.module.scss";

function App() {
  const [cardIsValid, setCardIsValid] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    cvc: "",
    expMonth: "",
    expYear: "",
  });

  function updateCardDetails(updatedData) {
    setCardDetails((prev) => ({ ...prev, ...updatedData }));
  }

  return (
    <main className={scss.main}>
      <Card data={cardDetails} />
      {cardIsValid ? (
        <Success />
      ) : (
        <CardDetailForm data={cardDetails} onChange={updateCardDetails} />
      )}
    </main>
  );
}

export default App;
