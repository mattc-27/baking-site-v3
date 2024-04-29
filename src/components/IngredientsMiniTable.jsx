import React, { useEffect, useState } from 'react';

export function IngredientsMiniTable({ data }) {

    const [visible, setVisible] = useState(false);

    function handleShow() {
        if (!visible) {
            setVisible(true)
        } else setVisible(false)
    }
    const formatQuantity = (quantity, unit) => {
        // Check if quantity is greater than 1, and if so, pluralize the unit
        const pluralizedUnit = quantity > 1 ? `${unit}s` : unit;
        // Use the pluralized unit if it exists, otherwise use the original unit
        return pluralizedUnit || unit;
    };

    return (
        <>
            <div className='sub-recipe-col'>
                {visible ?



                    <table className='sub-recipe-table' >
                        <div className='sub-recipe-head'>
                        <div className='sub-recipe-title'>
                        <h3>{data.sub_recipe_title}</h3>
                        <button id="closeSubRecipe" onClick={handleShow}>Close</button>
                    </div>
                        </div>

                        <tbody className='sub-recipe-table-body'>
                            <tr className='row-th' >
                                <th className='row-th-lg'> Ingredient</th>
                                <th className='row-th-md'>Amount</th>
                                <th className='row-th-md'>Unit</th>
                            </tr>
                            {data.sub_ingredients.map((item) => (
                                <tr className='row-td' /*  key={ing.id}*/  >
                                    <td className='row-sm'>{item.name}</td>
                                    <td className='row-sm'>
                                        {item.quantity}
                                    </td>
                                    <td className='row-sm'>
                                        {`${formatQuantity(item.quantity, item.unit)}`}
                                        {/*  {`${formatQuantity(ing.quantity, ing.unit)}`} */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    :
                    <div className='sub-recipe-title'>
                        <h3>{data.sub_recipe_title}</h3>
                        <button onClick={handleShow}>Show</button>
                    </div>
                }
            </div>
        </>
    );
}