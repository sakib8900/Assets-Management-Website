import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../assets/normalUser/normalUser (1).jpeg";
import img2 from "../../assets/normalUser/normalUser (2).jpeg";

const NormalUser = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <Carousel>
        {/* 1st Slide */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-blue-200 p-6 rounded-lg">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">
              Empower Your Team, Manage Your Assets with Ease!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Streamline asset management for your company with our robust,
              easy-to-use tools. Track, organize, and stay on top of your
              team's needs!
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={img1}
              alt="normalUser"
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>

        {/* 2nd Slide */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-blue-200 p-6 rounded-lg">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">
              Seamless Access to the Tools You Need!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Request, track, and manage your assets effortlessly. Your
              one-stop solution for everything you need at work.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={img2}
              alt="normalUser"
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default NormalUser;
