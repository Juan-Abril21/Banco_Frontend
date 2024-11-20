import { Input } from "@/components/ui/input";

export function InputDemo({type, nombre, value, onChange, inputMode}) {
  return (
    <Input
    inputMode = {inputMode} type={type} id={type} placeholder={nombre} value={value} onChange={onChange}
    />
  );
}
