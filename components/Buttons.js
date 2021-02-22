import style from "../styles/Buttons.module.css";

const Button = () => <div></div>;

export const Buttons = ({ buttons, page = 1 }) => {
  if (page === 1 || page === 2) {
    return (
      <div className={style.container}>
        <div>{buttons[0]}</div>
        <div>{buttons[1]}</div>
        <div>{buttons[2]}</div>
        ...
        <div>{buttons[buttons.length - 1]}</div>
      </div>
    );
  } else if (page === buttons.length || page === buttons.length - 1) {
    return (
      <div className={style.container}>
        <div>{buttons[0]}</div>
        ...
        <div>{buttons[buttons.length - 3]}</div>
        <div>{buttons[buttons.length - 2]}</div>
        <div>{buttons[buttons.length - 1]}</div>
      </div>
    );
  } else {
    return (
      <div className={style.container}>
        <div>{buttons[0]}</div>
        ...
        <div>{buttons[page - 2]}</div>
        <div>{buttons[page - 1]}</div>
        <div>{buttons[page]}</div>
        ...
        <div>{buttons[buttons.length - 1]}</div>
      </div>
    );
  }
};
