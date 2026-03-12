import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { User, Pencil, IdCard } from "lucide-react";

const AccountPage = () => {
  const userEmail = sessionStorage.getItem("userEmail");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    email: userEmail || "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(true);

  // --- SINGLE CONSOLIDATED FETCH LOGIC ---
  // This runs on page refresh and every time the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5142/api/profile/${userEmail}`);
        if (res.ok) {
          const data = await res.json();

          // Set all data into state, including the image filename from DB
          setFormData({
            email: data.email || userEmail,
            phoneNumber: data.phoneNumber || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            address: data.address || "",
            country: data.country || "",
            city: data.city || "",
            zipCode: data.zipCode || "",
            profilePicture: data.profilePicture || "",
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userEmail]);

  // Handle Profile Update (Text fields)
  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:5142/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Profile Updated Successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Update error", err);
      alert("Update failed - check server connection");
    }
  };

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("email", userEmail);

    try {
      const res = await fetch("http://localhost:5142/api/profile/upload-image", {
        method: "POST",
        body: uploadData,
      });

      if (res.ok) {
        const data = await res.json();
        // Update local state with the new filename immediately
        setFormData((prev) => ({ ...prev, profilePicture: data.fileName }));
        alert("Profile picture updated!");
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  if (loading) {
    return <div className='flex items-center justify-center min-h-screen font-bold'>Loading profile...</div>;
  }

  return (
    <div className='flex min-h-screen bg-slate-50 font-sans'>
      <Sidebar />

      <main className='flex-1 ml-64 p-12 flex flex-col lg:flex-row gap-8'>
        {/* LEFT CARD: Profile Summary */}
        <div className='w-full lg:w-80 flex flex-col items-center'>
          <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-sm w-full text-center'>
            <div className='relative w-32 h-32 mx-auto mb-4'>
              <div className='w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-200'>
                {formData.profilePicture ? (
                  <img
                    // Pointing to the backend uploads folder
                    src={`http://localhost:5142/uploads/${formData.profilePicture}`}
                    alt='Profile'
                    className='w-full h-full object-cover'
                    // The 'key' ensures React re-renders when picture changes
                    key={formData.profilePicture}
                  />
                ) : (
                  <User size={64} className='text-slate-400' />
                )}
              </div>

              <input type='file' ref={fileInputRef} onChange={handleImageUpload} accept='image/*' className='hidden' />

              <button
                onClick={() => fileInputRef.current.click()}
                className='absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-slate-100 hover:bg-slate-50 transition-colors z-10'>
                <Pencil size={14} className='text-red-500' />
              </button>
            </div>

            <h2 className='text-xl font-bold text-red-700 capitalize'>
              {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}` : "User Name"}
            </h2>
            <p className='text-sm text-slate-500 mb-1'>{formData.email}</p>
            <p className='text-sm text-slate-500 font-medium'>{formData.phoneNumber || "No Phone Number"}</p>
          </div>

          <div className='mt-6 text-center'>
            <button className='flex items-center gap-2 text-red-700 font-bold text-sm mx-auto hover:underline'>
              <IdCard size={18} /> Regarding ID Card
            </button>
            <p className='text-[12px] text-slate-400 mt-2 px-4 italic'>
              You're not eligible to request an ID card at this time.
            </p>
          </div>
        </div>

        {/* RIGHT FORM: Personal Details */}
        <div className='flex-1'>
          <h1 className='text-2xl font-bold text-slate-800'>Personal Details</h1>
          <p className='text-slate-400 text-sm mb-8'>Edit your personal information and address</p>

          <div className='bg-[#f8fafc] p-10 rounded-3xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6'>
            <InputGroup
              label='First Name'
              placeholder='Enter First Name'
              value={formData.firstName}
              onChange={(val) => setFormData({ ...formData, firstName: val })}
            />
            <InputGroup
              label='Last Name'
              placeholder='Enter Last Name'
              value={formData.lastName}
              onChange={(val) => setFormData({ ...formData, lastName: val })}
            />

            <div className='col-span-1'>
              <label className='block text-sm font-semibold mb-2 text-slate-700'>Mobile Number</label>
              <input
                disabled
                value={formData.phoneNumber}
                className='w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-500 cursor-not-allowed'
              />
              <p className='text-[10px] text-red-500 mt-1 font-bold uppercase tracking-tight'>
                *Contact office to change mobile number
              </p>
            </div>

            <div className='col-span-1'>
              <label className='block text-sm font-semibold mb-2 text-slate-700'>Email Address</label>
              <input
                disabled
                value={formData.email}
                className='w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-500 cursor-not-allowed'
              />
              <p className='text-[10px] text-red-500 mt-1 font-bold uppercase tracking-tight'>
                *Contact office to change email
              </p>
            </div>

            <InputGroup
              label='Address'
              placeholder='Enter your address'
              value={formData.address}
              onChange={(val) => setFormData({ ...formData, address: val })}
            />
            <InputGroup
              label='Country'
              placeholder='Enter your country'
              value={formData.country}
              onChange={(val) => setFormData({ ...formData, country: val })}
            />
            <InputGroup
              label='City'
              placeholder='Enter your city'
              value={formData.city}
              onChange={(val) => setFormData({ ...formData, city: val })}
            />
            <InputGroup
              label='Zip Code'
              placeholder='Enter your Zip Code'
              value={formData.zipCode}
              onChange={(val) => setFormData({ ...formData, zipCode: val })}
            />

            <div className='col-span-1 md:col-span-2 mt-4'>
              <button
                onClick={handleUpdate}
                className='bg-[#b91c1c] text-white px-10 py-3.5 rounded-xl font-bold hover:bg-red-800 transition-all active:scale-95 shadow-md'>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InputGroup = ({ label, placeholder, value, onChange }) => (
  <div className='flex flex-col'>
    <label className='text-sm font-semibold mb-2 text-slate-700'>{label}</label>
    <input
      type='text'
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className='p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 transition-all text-slate-800'
    />
  </div>
);

export default AccountPage;
