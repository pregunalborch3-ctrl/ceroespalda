import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ImgHTMLAttributes, AnchorHTMLAttributes } from "react";
import { Callout } from "./callout";
import { MdxImage } from "./mdx-image";
import { MedicalDisclaimer } from "./medical-disclaimer";
import { InArticleAd } from "@/components/ads/in-article-ad";

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "";
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  }
  return (
    <Link href={href} className={props.className}>
      {props.children}
    </Link>
  );
}

function MdxImgEl(props: ImgHTMLAttributes<HTMLImageElement>) {
  if (!props.src || typeof props.src !== "string") return null;
  return (
    <MdxImage
      src={props.src}
      alt={props.alt ?? ""}
      width={Number(props.width) || 1200}
      height={Number(props.height) || 675}
    />
  );
}

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  img: MdxImgEl,
  Callout,
  MdxImage,
  MedicalDisclaimer,
  InArticleAd,
};
