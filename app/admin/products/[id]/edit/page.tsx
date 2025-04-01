import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import axios from "axios";
import Image from "next/image";

type searchParams = {
  params: Promise<{ id?: string }>;
};

async function EditProductPage({ params }: searchParams) {
  const product = await params;
  const { data } = await axios.get(
    `https://furniture-shopping-eta.vercel.app/api/products?type=unique&id=${product.id}`
  );
  const { name, company, description, featured, price, image } = data;

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Update Product</h1>
      <div className="border p-8 rounded">
        <div>
          <h1>Image</h1>
          {/* IMAGE CONTAINER */}
          {/* <Image
            src={image}
            alt={name}
            fill
            priority
            className="rounded w-10 object-cover transform group hover:scale-110 transition-transform duration-300"
          /> */}
        </div>
        <FormContainer type="edit" productId={product.id}>
          <div className="grid gap-4 md:grid-cols-1 my-4">
            <input type="hidden" name="id" value={product.id} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              type="text"
              name="company"
              label="company name"
              defaultValue={company}
            />
            <PriceInput defaultValue={price} />
            <TextAreaInput
              name="description"
              labelText="product description"
              defaultValue={description}
            />
            <div className="mt-6">
              <CheckboxInput
                label="featured"
                name="featured"
                defaultChecked={featured}
              />
            </div>
            <SubmitButton text="Update Product" className="mt-8" />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}
export default EditProductPage;
