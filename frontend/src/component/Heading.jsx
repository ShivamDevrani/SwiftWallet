export function Heading({label})
{
    return <div className="font-bold text-4xl text-center pt-4">
         {label}
    </div>
}

export function SubHeading({label})
{
    return <div className="text-gray-600 font-medium font-serif text-center">
        {label}
    </div>
}
