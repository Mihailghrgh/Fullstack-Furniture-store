import { cn } from "@/lib/utils";

function EmptyList(
  { heading = "No items found" },
  classname: { heading: string; classname?: string }
) {
  return <h2 className={cn("text-xl", classname)}>{heading}</h2>;
}
export default EmptyList;
