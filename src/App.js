import PhoneInput from "./PhoneInput";

export default function App() {
  return (
    <PhoneInput onChange={(value) => console.log(value)} />
  );
}
