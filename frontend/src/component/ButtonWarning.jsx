import {Link} from 'react-router-dom'

export  function ButtonWarning({label,buttonText,to})
{
    return <div className='flex justify-center'>
        <div >{label}</div>
        <Link className=' underline pl-1 cursor-pointer' to={to}>
        {buttonText}
        </Link>
    </div>
}