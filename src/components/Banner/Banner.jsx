import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import employee from '../../../src/assets/employee (2).jpeg'
import hr from '../../../src/assets/hr.jpeg'
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src={hr} className="w-full h-auto object-cover max-h-[500px]" />
                <Link to="/hrForm">
                    <button className="legend">Join As Hr Manager</button>
                </Link>
            </div>
            <div>
                <img src={employee} className="w-full h-auto object-cover max-h-[500px]" />
                <Link to="/employeeForm">
                <button className="legend">Join As Employee</button>
                </Link>
            </div>
        </Carousel>
    );
};

export default Banner;