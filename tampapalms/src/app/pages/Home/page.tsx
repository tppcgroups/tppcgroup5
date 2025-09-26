// file: tampapalms/src/app/pages/Home/page.tsx

import { ImageCarousel } from "@/app/components/home/carousel/ImageCarousel"

export default function Home(){
    const images = [
      "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinition.jpg",
      "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg",
      "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-3-LargeHighDefinition.jpg",
      "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-4-LargeHighDefinition.jpg",
    ];

    return (
      <div>
        {/* Highlighted Images container */}
        <div className="relative h-[80dvh] rounded-xl bg-gray-200 my-2 mx-8 p-6">
          {/* <h1 className="text-black">Highlighted Images</h1> */}
            <ImageCarousel imageUrls={images} />
          <div className="absolute bottom-0 right-0 h-50 w-50 bg-white rounded-xl">
            <p className="text-black text-center pt-4">Highlighted Location</p>
          </div>
        </div>
        {/* Explore Spaces container */}
        <div className="h-[80dvh] rounded-xl mt-8 mx-8 p-6">
          <h1 className="text-black text-center text-3xl">Explore Spaces</h1>
          <hr className="h-px mt-2 border-t-3 border-black rounded-4xl"></hr>
          <div className="w-full flex flex-row justify-center">
            {/* LoopNet locations */}
            <div className="h-[80dvh] w-[80dvh] mt-20 bg-gray-200 hover:bg-gray-800 transition-colors duration-300 ease-in-out mr-5 rounded-xl"></div>
            <div className="h-[80dvh] w-[80dvh] mt-20 bg-gray-200 hover:bg-gray-800 transition-colors duration-300 ease-in-out ml-5 rounded-xl"></div>
          </div>
          {/* White space below the LoopNet locations */}
            <div className="h-20"></div>
        </div>
      </div>
    );
}