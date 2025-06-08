import React, { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = '',
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1 text-white'
                htmlFor={id}>
                {label}
            </label>}

            <input 
            type={type}
            className={`px-3 py-2 rounded-lg  outline-none  duration-200 border border-gray-200 w-full ${className}  `}
            id={id}
            ref={ref}
            {...props}
            />
            
        </div>
    )
})

export default Input