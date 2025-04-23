import { Label } from "../ui/label";
import { Input } from "../ui/input";

const name = "price";

function PriceInput() {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Price ($)
      </Label>
      <Input
        id={name}
        type="text"
        name="price"
        min={0}
        placeholder="$100"
        required
      />
    </div>
  );
}
export default PriceInput;
