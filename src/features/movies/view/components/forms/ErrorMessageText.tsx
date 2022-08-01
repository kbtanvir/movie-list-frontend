export default function ErrorMessageText({ errors, name }: any) {
  return <>{errors[name] && <div className="py-3 text-red-400">{errors[name].message}</div>}</>
}
