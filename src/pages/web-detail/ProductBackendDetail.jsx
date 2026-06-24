import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

import ProductInfo from "./ProductInfo";
import Description from "./Description";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (!product) return <h1>Product not found</h1>;

  return (
    <>
      <ProductInfo product={product} />
      <Description product={product} />
      <RelatedProducts />
    </>
  );
}