"use client"
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import Menu from "@/components/menu";
export default function Page({ params }: { params: { editingId: string } }) {
    const [productName, setProductName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [productCode, setProductCode] = useState<string>('');
    const [price, setPrice] = useState<number | string>('');
    const [quantity, setQuantity] = useState<number | string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [image, setImage] = useState<File | null>(null)
    const [images, setImages] = useState<string[]>()
    const [hidden, setHidden] = useState<boolean>(true)

    const editingId = params.editingId
    const { toast } = useToast()

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files
        if (files) { setImage(files[0]) }
    }

    const handleUpload = async () => {
        if (!image) return;
        const formData = new FormData();
        formData.append("image", image);
        try {
            setLoading(true)
            const response = await fetch("http://localhost:4000/upload", {
                method: "POST",
                body: formData
            })
            const data = await response.json()
            console.log(data.secure_url)
            setImages((s) => [...(s || []), data.secure_url])
            setLoading(false)
        } catch (error) {
            console.error("error uploading file:", error)
        }
    }

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

    async function createProduct() {
        fetch(`http://localhost:4000/products`,
            {
                method: 'POST',
                body: JSON.stringify({
                    productName,
                    description,
                    productCode,
                    price,
                    quantity,
                    images,
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

    useEffect(() => {
        handleUpload()
    }, [image])

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

    return (
        <div className="flex bg-[#FFFFFF] text-black">
            <Menu />
            <div className="bg-white h-screen text-black">
                <Label htmlFor="picture">Бүтээгдэхүүний нэр</Label>
                <Input
                    placeholder="Product Name"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                />
                <Label htmlFor="picture">Нэмэлт мэдээлэл</Label>
                <Input
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <Label htmlFor="picture">Барааны код</Label>
                <Input
                    placeholder="Product Code"
                    value={productCode}
                    onChange={e => setProductCode(e.target.value)}
                />
                <Label htmlFor="picture">Үндсэн үнэ</Label>
                <Input
                    placeholder="Price"
                    value={price}
                    type="number"
                    onChange={e => setPrice(e.target.value)}
                />
                <Label htmlFor="picture">Үлдэгдэл тоо ширхэг</Label>
                <Input
                    placeholder="Quantity"
                    value={quantity}
                    type="number"
                    onChange={e => setQuantity(e.target.value)}
                />

                <div className="grid w-full max-w-sm items-center gap-1.5 ">
                    <div className="rounded-full w-8 h-8 bg-gray-500 flex justify-center items-center" onClick={() => setHidden(s => !s)}>+</div>
                    <div className={`${hidden ? "hidden" : ""}`}>
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture" type="file" onChange={handleFileChange} />
                    </div>
                    {images?.map((i) => <Image src={i} width={100} height={100} alt="image" />)}
                </div>
                {editingId === 'new' ?
                    (<Button onClick={() => { createProduct() }}>Submit</Button>) :
                    (<Button onClick={() => updateProduct(editingId)}>Update product information</Button>)}



            </div>
        </div>)
}