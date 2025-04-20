import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();


  const hideExtras = pathname === '/lecturers';

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <div>
          <Link to="/" className="text-xl font-semibold">
            Home
          </Link>
        </div>

        <div className="flex space-x-4">
          {!hideExtras && (
            <>
              <Link to="/signin" className="hover:text-gray-300">
                Sign In
              </Link>
              <Link to="/signup" className="hover:text-gray-300">
                Sign Up
              </Link>
              <Link to="/tutors" className="hover:text-gray-300">
                Tutors
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
