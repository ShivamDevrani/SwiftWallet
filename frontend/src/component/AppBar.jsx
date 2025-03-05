export function AppBar({name})
{
    return <div className="flex justify-between p-2 shadow-2xl shadow-gray-300 border-2 border-gray-100">
        <div className="font-semibold ">
            PayTM App
        </div>
        <div className="flex gap-2 items-center">
        <div className="text-gray-900">
            Hello
        </div>
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-400 text-black">
            U
        </div>
        </div>

    </div>
}