import styles from "./Button.module.css";

export default function Button(props: { text: string }) {
  return (
    <button className={styles.button} type="submit">
      {props.text}
    </button>
  );
}
