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

    const getCategoriesFiltered = async () => {
        const response = await fetch(`http://localhost:4000/categories?selectedCategories=${selectedCategoriesQuery}&selected`);
        const data = await response.json();
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const [selectedCategoriesQuery, setSelectedCategoriesQuery] = useQueryState('selectedCategories', parseAsArrayOf(parseAsString));
    const [selectedSizesQuery, setSelectedSizesQuery] = useQueryState('selectedSizes', parseAsArrayOf(parseAsString));

    const handleCategoryChange = (id: string) => {
        if (selectedCategoriesQuery?.includes(id)) {
            const newValue = selectedCategoriesQuery.filter(item => item !== id);
            setSelectedCategoriesQuery(newValue);
        }
        else {
            const newValue = selectedCategoriesQuery ? [...selectedCategoriesQuery, id] : [id];
            setSelectedCategoriesQuery(newValue);
        }
    };

    const handleSizeChange = (size: string, checked: boolean | string) => {
        setSelectedSizesQuery(checked
            ? [...selectedSizes, size].join(',')
            : selectedSizes.filter(s => s !== size).join(','));
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
                                    checked={selectedCategoriesQuery?.includes(cat._id)}
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
                                checked={selectedSizes.includes(size)}
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
