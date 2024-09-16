'use client'
import { Checkbox } from "@/components/ui/checkbox"
import { useQueryState } from 'nuqs'


type Category = {
    id: string;
    name: string;
};

const categories: Category[] = [
    { id: "1", name: "Малгай" },
    { id: "2", name: "Усны сав" },
    { id: "3", name: "T-shirt" },
    { id: "4", name: "Hoodie" },
    { id: "5", name: "Tee" },
    { id: "6", name: "Цүнх" },
];
const sizes: string[] = ["Free", "S", "M", "L", "XL", "2XL", "3XL"];

export default function Categories() {
    const [selectedCategoriesQuery, setSelectedCategoriesQuery] = useQueryState('selectedCategories', { defaultValue: '' });
    const selectedCategories = selectedCategoriesQuery.split(',')

    const [selectedSizesQuery, setSelectedSizesQuery] = useQueryState('selectedSizes', { defaultValue: '' });
    const selectedSizes = selectedSizesQuery.split(',')

    const handleCategoryChange = (id: string, checked: boolean | string) => {
        setSelectedCategoriesQuery(checked
            ? [...selectedCategories, id].join(',')
            : selectedCategories.filter((cat: string) => cat !== id).join(','));
    };

    const handleSizeChange = (size: string, checked: boolean | string) => {
        setSelectedSizesQuery(checked
            ? [...selectedSizes, size].join(',')
            : selectedSizes.filter(s => s !== size).join(','));
    };

    return (
        <div>
            <div className="mb-8">
                <p className="font-bold text-base mb-2">Ангилалa</p>
                <ul>
                    {categories.map(cat => (
                        <li key={cat.id} className="py-1 flex gap-2 justify-left items-center text-sm">
                            <Checkbox
                                checked={selectedCategories.includes(cat.id)}
                                onCheckedChange={(checked) => handleCategoryChange(cat.id, checked)}
                            />
                            {cat.name}
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
                                onCheckedChange={(checked) => handleSizeChange(size, checked)}
                            />
                            {size}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
