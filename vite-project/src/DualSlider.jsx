import React, { useState } from 'react';

export const DualRangeSlider = () => {
 return (
    <div className='relative flex justify-center items-center my-2'>
        <input className='border rounded-lg h-[8px] appearance-none range-thumb absolute pointer-events-none accent-purple-500 bg-blue-900' type="range" min="1" max="100"  />
        <input className='appearance-none range-thumb absolute pointer-events-none accent-purple-500' type="range" min="1" max="100"/>

    </div>
 );
};
