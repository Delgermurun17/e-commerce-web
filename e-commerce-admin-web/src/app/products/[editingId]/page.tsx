"use client"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
export default function Page({ params }: { params: { editingId: string } }) {
    const [productName, setProductName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [productCode, setProductCode] = useState<string>('');
    const [price, setPrice] = useState<number | string>('');
    const [quantity, setQuantity] = useState<number | string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const editingId = params.editingId
    const { toast } = useToast()

    function updateProduct(id: string) {
        setLoading(true)

        fetch(`http://localhost:4000/products/${id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    productName,
                    description,
                    productCode,
                    price,
                    quantity,
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }
        )
            .then(() => {
                setLoading(false);
                toast({ description: "Successfully updated." });
                reset()

            })
    }

    function createProduct() {
        fetch(`http://localhost:4000/products`,
            {
                method: 'POST',
                body: JSON.stringify({
                    productName,
                    description,
                    productCode,
                    price,
                    quantity,
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
    }

    function reset() {
        setProductName(""),
            setDescription(""),
            setProductCode(""),
            setPrice(""),
            setQuantity("")
    }

    useEffect(() => {
        if (editingId) {
            getProductById(editingId)
        }
    }, [editingId])

    function getProductById(id: string) {
        // console.log(editingId)
        fetch(`http://localhost:4000/products/${id}`)
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setProductName(data.productName),
                    setDescription(data.description),
                    setProductCode(data.productCode),
                    setPrice(data.price),
                    setQuantity(data.quantity)
            })
    }

    return <div className="bg-white h-screen">
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
        {editingId === 'new' ?
            (<Button onClick={() => { createProduct() }}>Submit</Button>) :
            (<Button onClick={() => updateProduct(editingId)}>Update product information</Button>)}



    </div>
}