import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import hr from "../../../src/assets/hr/hrimg1.jpeg";
import employee from "../../../src/assets/hr/hrimg2.jpeg";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <Carousel>
            {/* HR Manager Slide */}
            <div className="relative w-full h-[500px]">
                {/* Blur Background */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                <img src={hr} className="w-full h-full object-cover" alt="HR Manager" />
                <Link to="/hrForm">
                    <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-10">
                        Join As HR Manager
                    </button>
                </Link>
            </div>

            {/* Employee Slide */}
            <div className="relative w-full h-[500px]">
                {/* Blur Background */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                <img src={employee} className="w-full h-full object-cover" alt="Employee" />
                <Link to="/employeeForm">
                    <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-10">
                        Join As Employee
                    </button>
                </Link>
            </div>
        </Carousel>
    );
};

export default Banner;
