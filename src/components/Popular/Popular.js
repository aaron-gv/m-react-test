import Card from '../Card/Card'

export default function Popular() {

    return (
        <div className="m-auto">
            <div className=" bg-gradient-to-b from-slate-500 to-slate-700 text-white h-12 flex items-center drop-shadow-lg">
                <span className="ml-10">Popular titles</span>
            </div>
            <div className='mt-4 w-full md:w-3/4  space-x-6'>
                <div className="w-full md:w-3/4 ml-2 m-auto flex space-x-6  md:space-x-4">
                    <Card title="Popular series" url="/series" image= "/images/placeholder.png" imageText="SERIES" tooltip={false} />
                    <Card title="Popular movies" url="/movies" image= "/images/placeholder.png" imageText="MOVIES" tooltip={false}  />
                </div>
            </div>
        </div>
    );

}