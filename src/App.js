import Card from "./components/Card";
import CardDetailForm from "./components/CardDetailForm";
// import Success from "./components/Success";

import scss from "./styles/App.module.scss";

function App() {
  return (
    <main className={scss.main}>
      <Card />
      <CardDetailForm />
      {/* <Success /> */}
    </main>
  );
}

export default App;
