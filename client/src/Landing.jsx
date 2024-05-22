import React from "react";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";

export const Main = () => {
  return (
		<div className="lg:flex">
			<div className="lg:w-1/2 w-full sm:p-7 flex flex-col justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
				<div className="p-7">
					<h1 className="text-7xl max-sm:text-5xl  font-bold ">
						<span className="border-b-4 border-theme">Let's</span>
					</h1>
					<h1 className="text-7xl max-sm:text-5xl font-bold text-theme mt-4">Collaborate</h1>
					<h1 className="text-7xl max-sm:text-5xl font-bold  mt-4">together!</h1>
				</div>

				<p className="text-lg p-7 text-gray-700 font-semibold">
					A closed platform for college students to engage in tech-related
					discussions, peer learning, and mentorship opportunities.
				</p>
				<div className="ml-8">
					<Link
						to="/signup"
						className="text-xl bg-theme hover:bg-blue-300 rounded-md text-white py-2 px-8 transition duration-300 ease-in-out transform hover:-translate-y-1"
					>
						Explore
					</Link>
				</div>
			</div>

			<div className="lg:w-1/2 w-full bg-transparent transition duration-500 ease-in-out transform hover:-translate-y-1 overflow-clip">
				<img
					src="https://i.ibb.co/qgxr4PD/3406394-1.png"
					alt="landing"
					className="object-contain w-full h-full hover:scale-105 transition duration-500 ease-in-out transform"
				/>
			</div>
		</div>
	);
};

const Landing = () => {
  return (
    <div className="overflow-x-clip lg:overflow-y-clip">
      <Navbar />
      <Main />
    </div>
  );
};

export default Landing;
