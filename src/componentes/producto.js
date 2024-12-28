import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CardProducto from "./card-producto";

const ProductDetail = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const [producto, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        navigate("/error");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Cargando...</h2>;
  }

  if (!producto) {
    return <h2 style={{ textAlign: "center" }}>Producto no encontrado</h2>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      <CardProducto producto={producto}/>
    </div>
  );
};

export default ProductDetail;
