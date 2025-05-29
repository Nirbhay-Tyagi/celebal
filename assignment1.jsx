import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

const countries = {
  India: ["Mumbai", "Delhi", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
};

function FormPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "First Name is required";
    if (!form.lastName) newErrors.lastName = "Last Name is required";
    if (!form.username) newErrors.username = "Username is required";
    if (!form.email || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.phoneCode || !form.phoneNumber) newErrors.phone = "Phone number is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.pan) newErrors.pan = "PAN No. is required";
    if (!form.aadhar) newErrors.aadhar = "Aadhar No. is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "country" && { city: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: form });
    }
  };

  const isFormValid = validate();

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto space-y-4">
      {[
        ["firstName", "First Name"],
        ["lastName", "Last Name"],
        ["username", "Username"],
        ["email", "E-mail"],
      ].map(([key, label]) => (
        <div key={key}>
          <label>{label}</label>
          <input name={key} value={form[key]} onChange={handleChange} className="w-full border p-2" />
          {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
        </div>
      ))}

      <div>
        <label>Password</label>
        <div className="flex">
          <input
            name="password"
            type={form.showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2"
          />
          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
            className="ml-2 px-2 border"
          >
            {form.showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <div>
        <label>Phone No.</label>
        <div className="flex space-x-2">
          <input name="phoneCode" value={form.phoneCode} onChange={handleChange} placeholder="Code" className="w-1/4 border p-2" />
          <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Number" className="w-3/4 border p-2" />
        </div>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div>
        <label>Country</label>
        <select name="country" value={form.country} onChange={handleChange} className="w-full border p-2">
          <option value="">Select Country</option>
          {Object.keys(countries).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
      </div>

      <div>
        <label>City</label>
        <select name="city" value={form.city} onChange={handleChange} className="w-full border p-2">
          <option value="">Select City</option>
          {countries[form.country]?.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
      </div>

      {[
        ["pan", "PAN No."],
        ["aadhar", "Aadhar No."],
      ].map(([key, label]) => (
        <div key={key}>
          <label>{label}</label>
          <input name={key} value={form[key]} onChange={handleChange} className="w-full border p-2" />
          {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
        </div>
      ))}

      <button type="submit" disabled={!isFormValid} className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50">
        Submit
      </button>
    </form>
  );
}

function SuccessPage({ location }) {
  const { state } = location;
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Form Submitted Successfully</h1>
      <pre className="bg-gray-100 p-4 border">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}
