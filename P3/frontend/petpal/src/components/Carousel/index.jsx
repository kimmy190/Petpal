import { useEffect, useState } from "react";
import { Carousel, initTE } from "tw-elements";
const ReactCarousel = ({ images }) => {
  const [imageSRC, setImageSRC] = useState();

  useEffect(() => {
    initTE({ Carousel });
  });

  useEffect(() => {
    Promise.all(
      images.map(async (imageObj) => {
        // TODO: How to fix this?? I think this issue goes away
        // Once we upload using React
        const url = imageObj.image.replace("http://127.0.0.1:8000", "");
        const response = await fetch(url);
        if (!response.ok) {
          return "";
        }
        return URL.createObjectURL(await response.blob());
      })
    ).then((arr) => {
      setImageSRC(arr);
    });
  }, [images]);

  return !!!imageSRC ? (
    <></>
  ) : (
    <div
      id="carousel"
      className="relative w-full h-[500px] bg-gray-200"
      data-te-carousel-init
      data-te-ride="carousel"
    >
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
        data-te-carousel-indicators
      >
        <button
          type="button"
          data-te-target="#carousel"
          data-te-slide-to={0}
          data-te-carousel-active
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-current="true"
          aria-label={`Slide 1`}
        ></button>

        {imageSRC.slice(1).map((val, i) => {
          return (
            <button
              key={i}
              type="button"
              data-te-target="#carousel"
              data-te-slide-to={i + 1}
              className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
              aria-label={`Slide ${i + 2}`}
            ></button>
          );
        })}
      </div>

      <div className="relative w-full h-full overflow-hidden after:clear-both after:block after:content-['']">
        <div
          className="relative float-left -mr-[100%] w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-active
          data-te-carousel-item
          classstyle={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={imageSRC[0]}
            className="block object-contain w-full h-full rounded"
            alt="..."
          />
        </div>

        {imageSRC.slice(1).map((val, i) => {
          return (
            <div
              key={i}
              className="relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-te-carousel-item
              classstyle={{ backfaceVisibility: "hidden" }}
            >
              <img
                src={val}
                class="block object-contain w-full h-full rounded"
                alt="..."
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReactCarousel;
