
"use client"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from 'next/navigation'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link";
import Menu from "@/components/menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from "next/image";
import dayjs from 'dayjs'



export default function Page() {
    const [productName, setProductName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [productCode, setProductCode] = useState<string>('');
    const [price, setPrice] = useState<number | string>('');
    const [quantity, setQuantity] = useState<number | string>('');
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [filterByPrice, setFilterByPrice] = useState<string>("")


    const router = useRouter()
    const searchParams = useSearchParams()
    const create = searchParams.get('create')
    const editingId = searchParams.get('editing')
    const open = create === "new" || !!editingId
    const { toast } = useToast()

    interface Product {
        _id: string;
        productName: string,
        productCode: string,
        price: number,
        quantity: number,
        createdAt: string,
        images?: string[]
    }

    function getProducts() {
        fetch(`http://localhost:4000/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    async function deleteProduct(id: string) {
        await fetch(`http://localhost:4000/products/${id}`,
            {
                method: 'DELETE'
            })
            .then(() => getProducts())

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



    useEffect(() => {
        getProducts();
    }, []);

    function onClose() {
        router.push('?')
    }

    function getProductsFilterById() {
        fetch(`http://localhost:4000/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }


    console.log(filterByPrice)
    return (
        <div className="flex bg-[#FFFFFF] text-black">
            <Toaster />
            <Menu />

            <div className="bg-[#ECEDF0] w-full">
                <div className="px-8">
                    <div className="flex gap-8 py-4 border-b-2">
                        <div>Бүтээгдэхүүн</div>
                        <div>Ангилал</div>
                    </div>
                    <Link href="/products/new">
                        <Button> + Бүтээгдэхүүн нэмэх</Button>
                    </Link>

                    <Select onValueChange={setFilterByPrice}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Үнэ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Үнэ өсөхөөр</SelectItem>
                            <SelectItem value="2">Үнэ буурахаар</SelectItem>
                            <SelectItem value="3">Хямдралын хувиар</SelectItem>
                        </SelectContent>
                    </Select>



                    <div className="mt-10">
                        {/* <Button onClick={() => { reset(); router.push(`?create=new`) }} variant="outline" className="my-8">+Add a product</Button> */}
                        {/* <Dialog open={open}>
                            <DialogContent onClose={() => router.push('?')}>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
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
                                        {editingId ?
                                            (<Button onClick={() => updateProduct(editingId)}>Update product information</Button>) :
                                            (<Button onClick={() => { createProduct(); onClose() }}>Submit</Button>)}

                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog> */}

                        <Table className="">
                            <TableCaption>Products list</TableCaption>
                            <TableHeader >
                                <TableRow>
                                    <TableHead className="w-[100px]"></TableHead>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Sold</TableHead>
                                    <TableHead >Date</TableHead>
                                    <TableHead className="text-right"></TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map(p =>
                                    <TableRow key={p._id}>
                                        <TableCell className="font-medium">
                                            {p.images && p.images.length > 0 &&
                                                <div className="w-14 h-14 rounded-full overflow-hidden">
                                                    <Image alt="" src={p.images[0]} width={100} height={100} />
                                                </div>
                                            }

                                        </TableCell>
                                        <TableCell>{p.productName}</TableCell>
                                        <TableCell>category</TableCell>
                                        <TableCell>{p.price}</TableCell>
                                        <TableCell>
                                            {p.quantity}
                                        </TableCell>

                                        <TableCell>sold</TableCell>
                                        {p.createdAt ?
                                            <TableCell>
                                                {dayjs(p.createdAt).format('YYYY-MM-DD')}
                                            </TableCell> :
                                            <TableCell></TableCell>}



                                        <TableCell className="text-right text-[4px] flex gap-4 text-slate-400">
                                            {/* <button onClick={() => router.push(`?editing=${p._id}`)}><Pencil /></button> */}
                                            <Link href={`/products/${p._id}`}><button><Pencil /></button></Link>
                                            <button onClick={() => deleteProduct(p._id)}><Trash2 /></button>
                                        </TableCell>
                                    </TableRow>
                                )}

                            </TableBody>
                        </Table>
                    </div>

                </div>
            </div>
        </div>
    );
}
