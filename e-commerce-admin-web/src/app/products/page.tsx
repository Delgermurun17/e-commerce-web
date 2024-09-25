
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
import { Clipboard, Grid2X2, Pencil, Settings, SquareChartGantt, Tag, Trash2 } from 'lucide-react';
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


export default function Page() {
    const [productName, setProductName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [productCode, setProductCode] = useState<string>('');
    const [price, setPrice] = useState<number | string>('');
    const [quantity, setQuantity] = useState<number | string>('');
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [menuItem, setMenuItem] = useState<string>("product")

    const router = useRouter()
    const searchParams = useSearchParams()
    const create = searchParams.get('create')
    const editingId = searchParams.get('editing')
    const open = create === "new" || !!editingId
    const { toast } = useToast()

    interface Menu {
        name: string;
        icon: any;
        value: string
    }
    const menu: Menu[] = [{ name: "Хяналтын самбар", icon: Grid2X2, value: "control" },
    { name: "Захиалга", icon: Clipboard, value: "order" },
    { name: "Орлого", icon: Tag, value: "income" },
    { name: "Бүтээгдэхүүн", icon: SquareChartGantt, value: "product" },
    { name: "Тохиргоо", icon: Settings, value: "settings" }
    ]


    interface Product {
        _id: string;
        productName: String,
        productCode: String,
        price: number,
        quantity: number,
        // Add other product properties here, if needed
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

    function getProducts() {
        fetch(`http://localhost:4000/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    function deleteProduct(id: string) {
        fetch(`http://localhost:4000/products/${id}`,
            {
                method: 'DELETE'
            })

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
                onClose()
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

    useEffect(() => {
        getProducts();
    }, [products]);

    function onClose() {
        router.push('?')
    }



    return (
        <div className="flex bg-[#FFFFFF] text-black">
            <div className="w-[222px] h-screen font-bold text-base flex flex-col gap-4 mt-4">
                <Toaster />
                {menu.map(m =>
                    <div className={`py-2 px-4 flex gap-2 ${menuItem === m.value ? `bg-[#ECEDF0]` : ''}`} key={m.name} onClick={() => setMenuItem(m.value)}>
                        <m.icon />
                        {m.name}
                    </div>
                )}
            </div>
            <div className="bg-[#ECEDF0] w-full">
                <div className={`${menuItem === "product" ? "block" : "hidden"}`}>
                    <div className="flex gap-8 py-4 border-b-2 px-8">
                        <div>Бүтээгдэхүүн</div>
                        <div>Ангилал</div>
                    </div>
                    <div className="px-8">
                        <Button onClick={() => { reset(); router.push(`?create=new`) }} variant="outline" className="my-8">+Add a product</Button>
                        <Dialog open={open}>
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
                        </Dialog>
                        <Table className="">
                            <TableCaption>Products list</TableCaption>
                            <TableHeader >
                                <TableRow>
                                    <TableHead className="w-[100px]">Product Name</TableHead>
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
                                        <TableCell className="font-medium">{p.productName}</TableCell>
                                        <TableCell>category</TableCell>
                                        <TableCell>{p.price}</TableCell>
                                        <TableCell>{p.quantity}</TableCell>
                                        <TableCell>sold</TableCell>
                                        <TableCell >date</TableCell>
                                        <TableCell className="text-right text-[4px] flex gap-4 text-slate-400">
                                            <button onClick={() => router.push(`?editing=${p._id}`)}><Pencil /></button>
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
