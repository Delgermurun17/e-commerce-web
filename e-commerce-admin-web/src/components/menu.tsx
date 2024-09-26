"use client"
import { Clipboard, Grid2X2, Pencil, Settings, SquareChartGantt, Tag, Trash2 } from 'lucide-react';
import Link from 'next/link';
export default function Menu(){
    interface Menu {
        name: string;
        icon: any;
        value: string
    }
    const menu: Menu[] = [{ name: "Хяналтын самбар", icon: Grid2X2, value: "control" },
    { name: "Захиалга", icon: Clipboard, value: "order" },
    { name: "Орлого", icon: Tag, value: "income" },
    { name: "Бүтээгдэхүүн", icon: SquareChartGantt, value: "products" },
    { name: "Тохиргоо", icon: Settings, value: "settings" }
    ]

    return (
        <div className="w-[300px] h-screen font-bold text-base flex flex-col gap-4 mt-4">
        {menu.map(m =>
            <Link className={`py-2 px-4 flex gap-2 `} key={m.name} href={`/${m.value}`}>
                <m.icon />
                {m.name}
            </Link>
        )}
    </div>
        
    )
}