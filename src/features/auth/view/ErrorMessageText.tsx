export default function ErrorMessageText({ errors, name }: any) {
  return <>{errors[name] && <p>{errors[name].message}</p>}</>;
}
