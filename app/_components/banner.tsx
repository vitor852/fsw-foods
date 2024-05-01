/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";

const Banner = (props: ImageProps) => {
  return (
    <div className="pt-6">
      <Image
        height={0}
        width={0}
        className="h-auto w-full object-contain"
        sizes="100vw"
        quality={100}
        {...props}
      />
    </div>
  );
};

export default Banner;
