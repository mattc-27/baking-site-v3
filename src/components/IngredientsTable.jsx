import React, { useEffect, useState } from 'react';

export function IngredientsTable({ ingredients }) {

    const formatQuantity = (quantity, unit) => {
        // Check if quantity is greater than 1, and if so, pluralize the unit
        const pluralizedUnit = quantity > 1 ? `${unit}s` : unit;
        // Use the pluralized unit if it exists, otherwise use the original unit
        return pluralizedUnit || unit;
    };
    return (
        <table className='recipe-table' >

            <div className='recipe-page-sub-title'>
                <h3>Ingredients</h3>
            </div>
            <tbody className='recipe-table-body'>
                <tr className='row-th' >
                    <th className='row-th-lg'> Ingredient</th>
                    <th className='row-th-lg'>Amount</th>
                    <th className='row-th-lg'>Unit</th>
                </tr>
                {ingredients.map((item) => (
                    <tr className='row-td' /*  key={ing.id}*/  >
                        <td className='row-sm'>{item.ingredient_name}</td>
                        <td className='row-sm'>
                            {item.quantity}
                        </td>
                        <td className='row-sm'>
                            {item.unit === null ? ''
                                : `${formatQuantity(item.quantity, item.unit)}`
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}