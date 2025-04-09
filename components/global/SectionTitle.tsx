import { Separator } from "@/components/ui/separator";

function SectionTitle({
  text,
  text1,
  text3,
}: {
  text: string;
  text1?: string;
  text3?: string;
}) {
  return (
    <div className="text-center">
      <Separator />
      <h1 className="text-primary my-4">{text3}</h1>
      <h2 className="text-4xl font-bold tracking-wider mb-2 text-center">
        {text}
      </h2>
      <h2 className="text-4xl font-bold tracking-wider mb-8 text-center">
        {text1}
      </h2>
      <Separator />
    </div>
  );
}
export default SectionTitle;
