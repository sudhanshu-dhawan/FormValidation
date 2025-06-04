import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", username: "",
    email: "", password: "", showPassword: false,
    phoneCode: "+91", phone: "",
    country: "", city: "",
    pan: "", aadhaar: "",
  });

  const [errors, setErrors] = useState({});
  const countries = {
    India: ["Delhi", "Mumbai", "Bangalore"],
    USA: ["New York", "San Francisco", "Chicago"],
  };

  const validate = () => {
    const e = {};
    const fields = ["firstName", "lastName", "username", "email", "password", "phone", "country", "city", "pan", "aadhaar"];

    const missing = fields.some(field => !form[field]);
    if (missing) {
      e.general = "All fields are required";
      return e;
    }

    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "10-digit phone";
    if (!form.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]$/)) e.pan = "Enter original/valid PAN";
    if (!form.aadhaar.match(/^\d{12}$/)) e.aadhaar = "12-digit Aadhaar";

    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      navigate("/success", { state: form });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1549088521-94b6502fec3d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md text-black font-bold  border border-white/30 shadow-xl rounded-2xl w-full max-w-xl text-white p-8 space-y-4 mx-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Register Now!</h2>

        <div className="grid grid-cols-2 gap-4">
          {["firstName", "lastName"].map((field) => (
            <div key={field}>
              <input
                type="text"
                placeholder={field.replace(/^\w/, c => c.toUpperCase())}
                className="w-full px-4 py-2 rounded text-black font-bold  bg-white/20 focus:outline-none"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </div>
          ))}
        </div>
          
        <input 
         
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 text-black font-bold rounded bg-white/20"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded text-black font-bold  bg-white/20"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="relative">
          <input
            type={form.showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-2 rounded text-black font-bold  bg-white/20"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span
            className="absolute right-3 top-2 cursor-pointer"
            onClick={() => setForm({ ...form, showPassword: !form.showPassword })}
          >
            {form.showPassword ? "👁️‍🗨️" : "👁️"}
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="w-20 px-2 py-2 rounded text-black font-bold  bg-white/20"
            value={form.phoneCode}
            onChange={(e) => setForm({ ...form, phoneCode: e.target.value })}
          />
          <input
            type="text"
            className="flex-1 px-4 text-black font-bold  py-2 rounded bg-white/20"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
  className="w-full px-4 py-2 bg-white/20 text-black rounded appearance-none focus:outline-none"
  value={form.country}
  onChange={(e) => setForm({ ...form, country: e.target.value, city: "" })}
>
  <option value="">Select Country</option>
  {Object.keys(countries).map((c) => (
    <option key={c} value={c}>{c}</option>
  ))}
</select>

          <select
            className="w-full px-4 py-2 text-black bg-white/20 rounded"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          >
            <option value="">Select City</option>
            {countries[form.country]?.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="PAN Number"
          className="w-full px-4 text-black font-bold  py-2 rounded bg-white/20"
          value={form.pan}
          onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })}
        />

        <input
          type="text"
          placeholder="Aadhaar Number"
          className="w-full px-4 text-black font-bold  py-2 rounded bg-white/20"
          value={form.aadhaar}
          onChange={(e) => setForm({ ...form, aadhaar: e.target.value })}
        />

        {errors.general && (
          <p className="text-red-400 text-sm text-center">{errors.general}</p>
        )}
        {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
        {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
        {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
        {errors.pan && <p className="text-red-400 text-sm">{errors.pan}</p>}
        {errors.aadhaar && <p className="text-red-400 text-sm">{errors.aadhaar}</p>}

        <button
          type="submit"
          className="w-full bg-white font-semibold py-2 rounded hover:bg-gray-200 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
