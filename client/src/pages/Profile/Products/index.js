import { Button } from "antd";
import React, { useState } from "react";
import ProductsForm from "./ProductsForm";

function Products() {
  const [showProductForm, setShowProductForm] = useState(false);
  return (
    <div>
      <div className="flex justify-end">
        <Button type="default" onClick={() => setShowProductForm(true)}>
          Add Product
        </Button>
      </div>

      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
        ></ProductsForm>
      )}
    </div>
  );
}

export default Products;
