export function Balance({balance})
{
   return <div className="flex gap-7 p-2 pl-4">
    <div className="font-bold text-sm text-gray-700">Your Balance</div>
    <div className="text-sm font-semibold">Rs {balance}</div>
   </div>
}