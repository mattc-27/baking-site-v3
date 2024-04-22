import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';

export default function LazyImage({ image }) {

    return (

        <img src={image} />
    )
}