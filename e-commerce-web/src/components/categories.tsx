'use client'
import { Checkbox } from "@/components/ui/checkbox"
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs'
import { useEffect, useState } from 'react';

const sizes: string[] = ["Free", "S", "M", "L", "XL", "2XL", "3XL"];

export default function Categories() {
    interface Category {
        _id: string;
        name: string;
        subcategories: string[];
    }
    const [categories, setCategories] = useState<Category[]>([]);
    const getCategories = async () => {
        const response = await fetch(`http://localhost:4000/categories`);
        const data = await response.json();
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const [selectedCategories, setSelectedCategories] = useQueryState('selectedCategories', parseAsArrayOf(parseAsString));
    const [selectedSizes, setSelectedSizes] = useQueryState('selectedSizes', parseAsArrayOf(parseAsString));

    useEffect(() => {
        getProductsFiltered();
    }, [selectedCategories, selectedSizes]);

    const getProductsFiltered = async () => {
        const response = await fetch(`http://localhost:4000/products?selectedCategories=${selectedCategories}&selectedSizes=${selectedSizes}`);
        const data = await response.json();
        // setProducts(data);
    };


    const handleCategoryChange = (id: string) => {
        if (selectedCategories?.includes(id)) {
            const newValue = selectedCategories.filter(item => item !== id);
            setSelectedCategories(newValue);
        }
        else {
            const newValue = selectedCategories ? [...selectedCategories, id] : [id];
            setSelectedCategories(newValue);
        }
    };

    const handleSizeChange = (size: string) => {
        if (selectedSizes?.includes(size)){
            const newValue = selectedSizes.filter(item => item!= size)
            setSelectedSizes( newValue)
        }
        else {
            const newValue= selectedSizes? [...selectedSizes, size] : [size]
            setSelectedSizes( newValue)
        }
    };

    return (
        <div>
            <div className="mb-8">
                <p className="font-bold text-base mb-2">Ангилал</p>
                <ul>
                    {categories.map(cat => (
                        <li key={cat._id} >
                            <label className="py-1 flex gap-2 justify-left items-center text-sm select-none">
                                <Checkbox
                                    checked={selectedCategories?.includes(cat._id)}
                                    onCheckedChange={() => handleCategoryChange(cat._id)}
                                />
                                {cat.name}
                            </label>

                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <p className="font-bold text-base mb-2">Хэмжээ</p>
                <ul>
                    {sizes.map(size => (
                        <li key={size} className="py-1 flex gap-2 justify-left items-center text-sm">
                            <Checkbox
                                checked={selectedSizes?.includes(size)}
                                onCheckedChange={() => handleSizeChange(size)}
                            />
                            {size}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
