'use client'
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

function RichTextRenderer({content}) {
    if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => {
          return (
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alternativeText || ""}
            />
          );
        },
      }}
    />
  )
}

export default RichTextRenderer