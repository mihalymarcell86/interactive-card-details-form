import scss from "../styles/Attribution.module.scss";

function Attribution() {
  return (
    <footer>
      <div class={scss.attribution}>
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://www.github.com/mihalymarcell86"
          target="_blank"
          rel="noreferrer"
        >
          Marcell Mihály
        </a>
        .
      </div>
    </footer>
  );
}

export default Attribution;
