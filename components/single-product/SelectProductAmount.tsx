import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export enum Mode {
  SingleProduct = "singleProduct",
  CartItem = "cartItem",
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

function SelectProductAmount(
  props: SelectProductAmountProps | SelectCartItemAmountProps
) {
  const { mode, amount, setAmount } = props;

  const cartItems = mode === Mode.CartItem;

  return (
    <>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
        disabled={cartItems ? props.isLoading : false}
      >
        <SelectTrigger
          className={cartItems ? "w-40" : "w-[150px] bg-secondary"}
        >
          <SelectValue placeholder={amount} />
        </SelectTrigger>
        <SelectContent className="items-center text-center">
          {Array.from({ length: cartItems ? amount + 10 : 10 }, (_, index) => {
            const selectValue = (index + 1).toString();
            return (
              <SelectItem
                className="text-center hover:cursor-pointer focus:bg-muted"
                key={index}
                value={selectValue}
              >
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
export default SelectProductAmount;
