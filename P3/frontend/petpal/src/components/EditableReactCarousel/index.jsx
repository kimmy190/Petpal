import { useEffect, useState } from "react";
import { Carousel, initTE } from "tw-elements";
import Dropzone from "../ImageDropzone";

const EditableReactCarousel = ({ images, addNewImage }) => {
  useEffect(() => {
    initTE({ Carousel });
  });

  const [active, setActive] = useState(0);

  return (
    <div id="carousel" className="relative w-full h-[500px] bg-gray-200">
      <div className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0">
        <button
          type="button"
          className={
            active === 0
              ? "mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none !opacity-100"
              : "mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          }
          aria-label={`Slide 1`}
          onClick={() => {
            setActive(0);
          }}
        ></button>

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
              aria-label={`Slide ${i + 2}`}
              onClick={() => {
                setActive(i + 1);
              }}
            ></button>
          );
        })}
      </div>

      <div className="relative w-full h-full overflow-hidden after:clear-both after:block after:content-['']">
        <div
          className={
            active === 0
              ? "relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none !block data-[te-carousel-fade]:opacity-100 data-[te-carousel-fade]:z-[1]"
              : "relative float-left -mr-[100%] hidden w-full h-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none hidden"
          }
          style={{ backfaceVisibility: "hidden" }}
        >
          <Dropzone
            onChange={(e) => {
              addNewImage(e.target.files[0]);
            }}
          />
        </div>

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute top-2 text-gray-700 right-2 w-12 h-12 lg:w-14 lg:h-14 hover:cursor-pointer hover:scale-110"
                onClick={() => {
                  setActive(i);
                  obj.onDelete(images);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditableReactCarousel;
