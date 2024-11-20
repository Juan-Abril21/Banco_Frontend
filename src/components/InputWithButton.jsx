import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"

export function InputWithButton({ 
  nombreLabel, 
  type, 
  buttonMessage, 
  click, 
  value, 
  onChange, 
  nombre 
}) {
  return (
    <div className="w-full max-w-sm">
      <div className="grid w-full gap-1.5">
        <Label>{nombreLabel}</Label>
        <div className="flex items-center space-x-2">
          <Input 
            type={type} 
            id={type} 
            placeholder={nombre} 
            value={value} 
            onChange={onChange}
          />
          <Button onClick={click} type="submit">
            {buttonMessage}
          </Button>
        </div>
      </div>
    </div>
  );
}