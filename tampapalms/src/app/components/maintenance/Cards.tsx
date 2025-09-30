
import { PiNotebookBold, PiWrenchBold, PiCheckCircleBold, PiPhoneBold  } from "react-icons/pi";

const Card = () => {
    return(
        <div className="mx-auto max-w-6xl px-4 py-8">
            {/*Header*/}
            <div className="text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">How It Works</h1>
            </div>

            {/* Main grid*/}
            <div className="flex justify-center items-center py-10 bg-transparent">

                <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
                    {/* Card 1 - Submit Request */}
                    <div className="relative bg-white rounded-2xl shadow-lg p-6 space-y-4 transition-transform duration-500 hover:scale-[1.02] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[6px] before:bg-gray-300 before:rounded-t-2xl">
                        <span className="flex items-center justify-center text-black text-4xl"><PiNotebookBold /></span>
                        <div className="flex items-center justify-center">
                            <span><h2 className="text-xl font-semibold text-black ">Submit Request</h2></span>
                        </div>
                        <p className="text-black text-center">Log in to our partner system to submit a request online.</p>      
                    </div>

                    {/* Card 2 - Handled by Experts*/}
                    <div className="relative bg-white rounded-2xl shadow-lg p-6 space-y-4 transition-transform duration-500 hover:scale-[1.02] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[6px] before:bg-gray-300 before:rounded-t-2xl">
                        <span className="flex items-center justify-center text-black text-4xl"><PiWrenchBold /></span>
                        <div className="flex items-center justify-center">
                            <span><h2 className="text-xl font-semibold text-black ">Handled by Experts</h2></span>
                        </div>
                        <p className="text-black text-center">Our partner coordinates and resolves all maintenance issues.</p>      
                    </div>

                    {/* Card 3 - Stay Updated */}
                    <div className="relative bg-white rounded-2xl shadow-lg p-6 space-y-4 transition-transform duration-500 hover:scale-[1.02] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[6px] before:bg-gray-300 before:rounded-t-2xl">
                        <span className="flex items-center justify-center text-green-400 text-4xl"><PiCheckCircleBold /></span>
                        <div className="flex items-center justify-center">
                            <span><h2 className="text-xl font-semibold text-black ">Stay Updated</h2></span>
                        </div>
                        <p className="text-black text-center">Track the status of your request at any time.</p>      
                    </div>
                </div> 
            </div>
                {/* Card 4 - Emergency Phone*/}
                <section className=" ">
                    <div className="relative bg-white rounded-2xl shadow-lg p-6 space-y-4 transition-transform duration-500 hover:scale-[1.02] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[6px] before:bg-gray-300 before:rounded-t-2xl">
                        <span className="flex items-center justify-center text-red-600 text-4xl"><PiPhoneBold/> </span>
                        <div className="flex items-center justify-center">
                            <span><h2 className="text-xl font-semibold text-black ">Emergency</h2></span>
                        </div>
                        <p className="text-black mt-3 mx-26 text-xl">If this is an emergency, such as problems with smoke, electrical spark, break-in, or active plumbing leak, please call the number below and opt 5 to report your problem.</p>
                        <p className="text-2xl font-extrabold text-black mt-6 tracking-wide text-center justify-center">(123)-456-7890</p>
                    </div>
                </section> 
        </div>
        
    );
};

export default Card;

