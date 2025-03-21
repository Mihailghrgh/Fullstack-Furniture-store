import { cn } from "@/lib/utils";

function EmptyList(
  { heading , classname }
  : { heading: string; classname?: string }
) {
  return <h2 className={cn("text-xl", classname)}>{heading}</h2>;
}
export default EmptyList;
