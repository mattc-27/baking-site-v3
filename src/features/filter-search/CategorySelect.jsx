import React, { useEffect, useState } from 'react';
import { Select } from './Select';

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