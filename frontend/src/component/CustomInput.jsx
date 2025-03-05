export function CustomInput({label,placeholder,onchange})
{
    return <div>  
        <div className="font-semibold">
            {label}
        </div>
        <input
        onChange={onchange}
  className="border-2 border-gray-200 w-full px-2 py-1 mt-2 rounded"
  type="text"
  placeholder={placeholder}
/>

    </div>
}