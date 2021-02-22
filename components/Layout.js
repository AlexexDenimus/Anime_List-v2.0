import styles from "../styles/Layout.module.css";

export const Layout = (props) => (
  <div className={styles.container}>{props.children}</div>
);
