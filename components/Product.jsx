import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            src={urlFor(image && image[0]).size(200, 200).url()}
            width={250}
            height={250}
            alt="Image of Product"
            className="product-image"
          />
          <p className="product-namee">{name}</p>
          <p className="product-price">₹{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
