import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel({type, nombre, nombreLabel, value, onChange, inputMode}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>{nombreLabel}</Label>
      <Input inputMode = {inputMode} type={type} id={type} placeholder={nombre} value={value} onChange={onChange}/>
    </div>
  )
}
