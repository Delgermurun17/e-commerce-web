import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

interface Category {
  _id: string;
  name: string;
  subcategories: string[];
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState('');
  // const [subcategoryName, setSubcategoryName] = useState('');
  // const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const getCategories = async () => {
    const response = await fetch('http://localhost:4000/categories');
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);



  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName }),
    });

    if (response.ok) {
      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      setCategoryName('');
    }
  };

  // const handleAddSubcategory = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!selectedCategoryId) return;

  //   const response = await fetch(`http://localhost:4000/categories/${selectedCategoryId}/subcategories`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name: subcategoryName }),
  //   });

  //   if (response.ok) {
  //     const newSubcategory = await response.json();
  //     setCategories(prev =>
  //       prev.map(category =>
  //         category._id === selectedCategoryId
  //           ? { ...category, subcategories: [...category.subcategories, newSubcategory._id] }
  //           : category
  //       )
  //     );
  //     setSubcategoryName('');
  //   }
  // };

  return (
    <div>
      <Card className='p-6 flex flex-col gap-4 mt-4'>
        <h1>Categories</h1>
        <form onSubmit={createCategory}>
          <Input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />
          <Button type="submit">Add Category</Button>
        </form>

        {categories.map(category => (
          <Card key={category._id} className='p-2'>
            <h2>{category.name}</h2>

            {/* <ul>
              {category?.subcategories?.map((subcatId) => (
                <li key={subcatId}>{subcatId}</li> 
              ))}
            </ul> */}
          </Card>
        ))}

      </Card>
{/* 
      <Card className='p-6 flex flex-col gap-4'>
        <select
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          value={selectedCategoryId || ''}
          required
        >
          <option value="">Select a category</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <form onSubmit={handleAddSubcategory}>
          <Input
            type="text"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            placeholder="Enter subcategory name"
            required
          />
          <Button type="submit">Add Subcategory</Button>
        </form>

      </Card> */}


    </div>
  );
};

export default CategoriesPage;
