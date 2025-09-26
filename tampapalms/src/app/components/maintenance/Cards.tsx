import Image from "next/image";
const Card = () => {
    return(
        <div className="mx-auto max-w-6xl px-4 py-8">
            {/*Header*/}
            <div className="text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Maintenance Requests</h1>
                <div className="mx-auto mt-2 h-[2px] w-3/4 max-w-md bg-gray-900"></div>
            </div>

            {/* Main grid*/}
            <div className="mt-6 grid gap-10 md:grid-cols-2">
                {/*left Card*/}
                <div className="rounded-xl bg-white p-6 shadow-xl ring-1">
                    {/*Image Placeholder */}
                    <div className=" relative overflow-hidden rounded-md bg-gray-300 text-gray-700 flex items-center justify-center aspect-[5/3]">
                        <Image src="/maintenanceIMG.png" alt="Maintenance team" fill></Image>
                    </div>
                    {/*Maintenance Message*/}
                    <p className="mt-6 text-[15px] text-gray-800">For all other Maintenance Requests. Please Sign in Here:</p>

                    {/*Sign In Button */}
                    <button className="mt-3 w-full rounded 2xl bg-gray-300 py-3 text-md font-semibold text-gray-900 shadow-sm hover:bg-gray-200 active:scale-[.99]" type="button">Sign In</button>
                </div>


            </div>

        </div>
        
    );
};

export default Card;