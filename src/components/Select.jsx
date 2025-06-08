import React,{useId} from 'react'


function Select({
    label,  
    options,
    className='',
    ...props
},ref) {
    const id = useId();
  return (
    <div className='w-full'>
        {label && <label className='' htmlFor={id}></label>}
        <select {...props} id={id} ref={ref}
        className={` px-3 py-2 rounded-lg  outline-none  duration-200 border border-gray-200 w-full ${className}  `}
        >
        
        {options.map((option)=>(
            <option value={option} key={option}
            >{option}
            </option>
        ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)