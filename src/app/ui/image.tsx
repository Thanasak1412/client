import NextImage, { ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt?: string;
}

export default function Image({ src, alt = "", ...other }: Readonly<Props>) {
  return (
    <div className="relative w-full pb-[56.25%]">
      <NextImage
        src={src}
        alt={alt}
        style={{ objectFit: "cover", ...other.style }}
        {...other}
      />
    </div>
  );
}
