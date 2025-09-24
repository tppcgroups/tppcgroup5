const Card = () => {
    return(
        <div className="bg-white mx-auto w-4xl p-4 sm:p-6">
            {/*Header*/}
            <div className="text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Maintenance</h1>
                <div className="mx-auto mt-2 h-[2px] w-full bg-gray-900/80" />
            </div>

            {/*Card*/}
            <div className="mt-6 rounded-xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:p-6 w-sm h-max">
                <div className="grid gap-6 md:grid-cols-2 md:gap-8"></div>
            
            </div>

        </div>
    );
};

export default Card;