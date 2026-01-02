import { useState } from "react";
import api from "../services/api";

const PatentForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    role: "Student",
    uidEid: "",
    email: "",
    mobile: "",
    department: "",
    title: "",
    patentType: "",
    category: "",
  });

  const [signature, setSignature] = useState(null);
  const [patentPdf, setPatentPdf] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!signature || !patentPdf) {
  setMessage("Please upload both signature and patent PDF");
  return;
}

    if (patentPdf.type !== "application/pdf") {
  setMessage("Patent file must be a PDF");
  return;
}

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    data.append("signature", signature);
    data.append("patentPdf", patentPdf);
    data.append("coInventors", JSON.stringify([]));


    try {
      await api.post("/patents/submit", data);
      setMessage(
        "Your patent is submitted and under process. Please wait."
      );
      onSuccess();
    } catch (err) {
      setMessage("Submission failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Submit New Patent</h2>

      {message && <p className="mb-3 text-blue-600">{message}</p>}

      <div className="grid grid-cols-2 gap-4">
        <select
  name="role"
  className="border p-2 rounded"
  onChange={handleChange}
  required
>
  <option value="">Select Role</option>
  <option value="Student">Student</option>
  <option value="Teacher">Teacher</option>
</select>

        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="uidEid" placeholder="UID / EID" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} />
        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
        />
        <input
          name="title"
          placeholder="Patent Title"
          onChange={handleChange}
          required
        />
        <select
  name="patentType"
  className="border p-2 rounded"
  onChange={handleChange}
  required
>
  <option value="">Select Patent Type</option>
  <option value="Utility">Utility</option>
  <option value="Design">Design</option>
  <option value="Provisional">Provisional</option>
</select>

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />
      </div>

      <div className="mt-4">
        <label>Signature</label>
        <input type="file" onChange={(e) => setSignature(e.target.files[0])} />
      </div>

      <div className="mt-2">
        <label>Patent PDF</label>
        <input type="file" onChange={(e) => setPatentPdf(e.target.files[0])} />
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Submit Patent
      </button>
    </form>
  );
};

export default PatentForm;
