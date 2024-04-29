import React, { useEffect, useState } from 'react';
import { Select, Checkbox } from './Select';

export function SelectCategory({ setQuery }) {

    const [categoryFilter, setCategoryFilter] = useState('');

    const categories = [
        { name: 'Select category', value: '' },
        { name: 'Muffins', value: 'muffins' },
        { name: 'Pies', value: 'pies' },
        { name: 'Cookies', value: 'cookies' },
        { name: 'Bars', value: 'bars' },
        { name: 'Sweet Breads', value: 'sweet_breads' },
    ];

    /*
    useEffect(() => {
      setCategoryFilter(categories[0])
    },[])
    */


    const handleChange = (e) => {
        setCategoryFilter(e.target.value);
        setQuery(e.target.value)
    };

    return (
        <div className='filter-component'>
            {/*       <div className='filter-label'>
                <h2>Select category</h2>
            </div>
            */}
            <div
                className='filter-category'>
                <Select
                    selectLabel={categories.name}
                    data={categories}
                    value={categoryFilter}
                    //defaultValue={categories[0]}
                    name="categoryFilter"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export function CategoryOptions({ setQuery }) {

    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = 
  [
        { name: 'Muffins', value: 'muffins' },
        { name: 'Pies', value: 'pies' },
        { name: 'Cookies', value: 'cookies' },
        { name: 'Bars', value: 'bars' },
        { name: 'Sweet Breads', value: 'sweet_breads' }
    ]
    

    /*
    useEffect(() => {
      setCategoryFilter(categories[0])
    },[])
    */
    const handleChange = (e) => {
        setCategoryFilter(e.target.value);
        setQuery(e.target.value)
    };
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
          setSelectedCategories([...selectedCategories, value]);
        } else {
          setSelectedCategories(selectedCategories.filter((category) => category !== value));
        }
      };

      useEffect(() => {
setQuery(selectedCategories)
      },[setSelectedCategories])
    
    return (
        <div className='filter-component'>
        <label>
          <input
            type="checkbox"
            value="muffins"
            checked={selectedCategories.includes('muffins')}
            onChange={handleCheckboxChange}
          />
          Muffins
        </label>
        <label>
          <input
            type="checkbox"
            value="pies"
            checked={selectedCategories.includes('pies')}
            onChange={handleCheckboxChange}
          />
          Pies
        </label>
        <label>
          <input
            type="checkbox"
            value="cookies"
            checked={selectedCategories.includes('cookies')}
            onChange={handleCheckboxChange}
          />
          Cookies
        </label>
        {/* Add more checkboxes for other categories */}
      </div>
    );
}