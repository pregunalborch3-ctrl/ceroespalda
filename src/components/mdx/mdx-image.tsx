import Image, { type ImageProps } from "next/image";

interface MdxImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  caption?: string;
}

export function MdxImage({
  alt,
  caption,
  width = 1200,
  height = 675,
  ...rest
}: MdxImageProps) {
  return (
    <figure className="not-prose my-8">
      <Image
        alt={alt}
        width={typeof width === "string" ? parseInt(width, 10) : width}
        height={typeof height === "string" ? parseInt(height, 10) : height}
        sizes="(min-width: 768px) 720px, 100vw"
        className="rounded-lg border bg-muted"
        {...rest}
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
