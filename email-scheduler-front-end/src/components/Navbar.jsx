import { Link } from "react-router-dom";

const Navbar = () => {
  

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold">
        Campaign Scheduler
      </Link>
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
        >
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
