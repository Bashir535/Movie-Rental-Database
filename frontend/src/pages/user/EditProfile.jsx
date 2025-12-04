import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../api/user";

const EditProfile = () => {

  const authUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(authUser.firstName);
  const [lastName, setLastName] = useState(authUser.lastName);
  const [email, setEmail] = useState(authUser.email);

  const handleSave = async () => {
    const dto = { firstName, lastName, email };

    try {
      await updateUser(authUser.customerID, dto);

      const updated = { ...authUser, ...dto };
      localStorage.setItem("authentication", JSON.stringify(updated));
      dispatch({ type: "SIGN_IN", payload: updated });

    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="bg-neutral-900 p-8 rounded-xl w-full max-w-md border border-neutral-800">

        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

        <label className="block text-gray-300 mb-1">First Name</label>
        <input
          className="w-full bg-neutral-800 p-3 rounded mb-4 border border-neutral-700"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />

        <label className="block text-gray-300 mb-1">Last Name</label>
        <input
          className="w-full bg-neutral-800 p-3 rounded mb-4 border border-neutral-700"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />

        <label className="block text-gray-300 mb-1">Email</label>
        <input
          className="w-full bg-neutral-800 p-3 rounded mb-6 border border-neutral-700"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="w-full bg-white text-black font-semibold p-3 rounded hover:bg-gray-200 transition"
        >
          Save Changes
        </button>

      </div>
    </div>
  );

};

export default EditProfile;