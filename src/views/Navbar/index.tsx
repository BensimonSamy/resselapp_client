import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faShoePrints } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";

import './style.css';

const Navbar = () => {

    return (
        <nav className="bg-gray-800 w-max p-4">
            <div className="hidden sm:block w-max">
                <div className="flex-shrink-0 flex items-center justify-center mb-4">
                    <img className="h-12 w-12 rounded-full shadow-md" src="https://images.wave.fr/images//jordan-1-retro-high-og-black-toe3.jpg" alt="Workflow"></img>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <NavLink activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/dashboard">Dashboard</NavLink>
                    <NavLink activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/list">Mes Sneakers</NavLink>
                </div>
            </div>
            {

                <div className="block sm:hidden">
                    <div className="space-y-4">
                        <NavLink activeClassName="bg-gray-900 text-white rounded-md text-sm font-medium" className="text-gray-300 px-2 py-1 hover:bg-gray-700 hover:text-white block rounded-md text-base font-medium" to="/dashboard"><FontAwesomeIcon icon={faTachometerAlt} /></NavLink>
                        <NavLink activeClassName="bg-gray-900 text-white rounded-md text-sm font-medium" className="text-gray-300 px-2 py-1 hover:bg-gray-700 hover:text-white block rounded-md text-base font-medium" to="/list"><FontAwesomeIcon icon={faShoePrints} /></NavLink>
                    </div>
                </div>

            }
        </nav>
    )
}

export default Navbar;