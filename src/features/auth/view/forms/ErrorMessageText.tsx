export default function ErrorMessageText({ errors, name }: any) {
  return <>{errors[name] && <div>{errors[name].message}</div>}</>;
}
