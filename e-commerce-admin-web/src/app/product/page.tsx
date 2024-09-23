
"use client"
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Page() {
    const [productName, setProductName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [productCode, setProductCode] = useState<string>('');
    const [price, setPrice] = useState<number | string>('');
    const [quantity, setQuantity] = useState<number | string>('');
    function createProduct(){
        fetch(`http://localhost:4000/products`,
            {
                method: 'POST',
                body: JSON.stringify(
                    productName,
                    description,
                    productCode,
                    price,
                    quantity,
                )}, 
               headers: {"Content-type": "application/json; charset=UTF-8"}
        )}

    return (
        <div className="w-[30%]">
            <Input
                placeholder="Product Name"
                value={productName}
                onChange={e => setProductName(e.target.value)}
            />
            <Input
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <Input
                placeholder="Product Code"
                value={productCode}
                onChange={e => setProductCode(e.target.value)}
            />
            <Input
                placeholder="Price"
                value={price}
                type="number"
                onChange={e => setPrice(e.target.value)}
            />
            <Input
                placeholder="Quantity"
                value={quantity}
                type="number"
                onChange={e => setQuantity(e.target.value)}
            />
            <button onClick={createProduct}>Submit</button>
        </div>
    );
}
