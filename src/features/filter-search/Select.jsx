import React, { useState, useEffect } from 'react';

export function Select({ value, name, onChange, selectLabel, data }) {

    return (
        <div className='filter-select'>
            <label >{selectLabel}</label>
            <select className='filter-option' data={data} value={value} name={name} onChange={onChange}>
                {data.map((option) => (
                    <option key={option.value} value={option.value} >{option.name}</option>
                ))}
            </select>
        </div>
    )
}


export function Checkbox({ data }) {

    return (
        <div className='filter-select'>
            <label>{data.name}</label>
            <input 
            type='checkbox'
            className='filter-option' 
        
       
            />
            {/*         {data.map((option) => (
                    <option key={option.value} value={option.value} >{option.name}</option>
                ))} */}
        </div>
    )
}
