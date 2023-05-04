
export default function Pagination({pages, current, itemsPerPage, action}) {
    return (
        <div className='m-auto p-4 overflow-hidden flex items-center justify-center '>
            {[...Array(pages)].map((_,num) => {
                return <div key={num} className={'float-left text-blue  p-2 ' + (num == current ? 'font-normal text-black cursor-normal' : 'cursor-pointer font-bold text-blue-500')} onClick={() => action(num)}>{num+1}</div>
            })}
        </div>
    );
}