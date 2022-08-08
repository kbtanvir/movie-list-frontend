import styles from "./Input.module.css";
export default function ErrorMessage({ errors, name }: any) {
  return (
    <>
      {errors[name] && (
        <p className={styles.errorText}>{errors[name].message}</p>
      )}
    </>
  );
}
