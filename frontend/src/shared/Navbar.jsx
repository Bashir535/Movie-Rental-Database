import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logOutUser } from "../store/actions";
import toast from "react-hot-toast";

export default function NavBar() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const hiddenRoutes = ["/", "/register"];

  const shouldHide = hiddenRoutes.includes(location.pathname);

  if (shouldHide) return null;

  const handleLogout = () => {
    dispatch(logOutUser(navigate));
    toast.success("You have been logged out");
  };

  return (
    <div className="w-full bg-neutral-900 text-white p-4 flex justify-end shadow-md">
      {user && (
        <button
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
}
