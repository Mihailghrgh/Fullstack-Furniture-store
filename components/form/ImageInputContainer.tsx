"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";

type ImageInputContainerProps = {
  image: string;
  name: string;
  text: string;
  productId: string;
  children?: React.ReactNode;
};

function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, text, productId } = props;
  const [isUpdatedFormVisible, setUpdatedFormVisible] = useState(false);

  return (
    <div className="mb-8">
      <Image
        src={image}
        width={200}
        height={200}
        className="rounded object-cover mb-4 w-[200px] h-[200px]"
        alt={name}
        priority
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => setUpdatedFormVisible((prev) => !prev)}
      >
        {text}
      </Button>
      {isUpdatedFormVisible && (
        <div className="max-w-md mt-4">
          <FormContainer type="updatedImage" productId={productId}>
            {props.children}
            <ImageInput />
            <SubmitButton size="sm" text={text}></SubmitButton>
          </FormContainer>
        </div>
      )}
    </div>
  );
}
export default ImageInputContainer;
