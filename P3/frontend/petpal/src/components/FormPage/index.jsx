import { Link } from "react-router-dom";
// import { Button } from 'flowbite-react';
const FormPage = ({title, children})=>{
    return (
        <>
        <header>
            <nav className="z-10 w-full md:fixed">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
                {/* <a href="./main.html" className="flex items-center">
                
                </a> */}
                <Link to="/main" className="flex items-center">
                    <span className="self-center text-3xl font-bold whitespace-nowrap">
                        Pet Pal
                    </span>
                </Link>
            </div>
            </nav>
        </header>
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-xl xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    {/* Gonna b the title */}
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        {title}
                    </h1>
                    {/* where the form goes */}
                    {children}
                </div>
            </div>
            </div>
        </section>
        </>
    );
}

export default FormPage; 