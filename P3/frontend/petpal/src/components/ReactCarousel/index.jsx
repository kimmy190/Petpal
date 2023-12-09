import { useState } from "react";

const ReactCarousel = ({ images }) => {
  const [active, setActive] = useState(1);

  return (
    <div id="carousel" className="relative w-full h-[560px] bg-gray-200">
      <div className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0">
        {images.map((obj, i) => {
          return (
            <button
              key={i}
              type="button"
              className={
                active === i + 1
                  ? "mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none !opacity-100"
                  : "mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
              }
              aria-label={`Slide ${i + 1}`}
              onClick={() => {
                setActive(i + 1);
              }}
            ></button>
          );
        })}
      </div>

      <div className="relative w-full h-full overflow-hidden after:clear-both after:block after:content-['']">
        {images.map((obj, i) => {
          let className =
            "relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ";
          if (active === i + 1) {
            className +=
              "!block data-[te-carousel-fade]:opacity-100 data-[te-carousel-fade]:z-[1]";
          } else {
            className += "hidden";
          }
          return (
            <div
              key={i}
              className={className}
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src={obj.url}
                className="block object-contain w-full h-full rounded"
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
