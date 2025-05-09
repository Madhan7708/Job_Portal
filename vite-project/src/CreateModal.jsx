import { useState } from "react";
import axios from "axios";

export function CreateModal({ mod, locs, types, trig, setTrig }) {
  const [formData, setFormData] = useState({
    job_title: '',
    company: '',
    location: '',
    job_type: '',
    description: '',
    deadline: '',
    salary: {
      min: '',
      max: '',
    }
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "min" || name === "max") {
      setFormData((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async () => {
    const { job_title, company, location, job_type, description, deadline, salary } = formData;

    if (
      !job_title || !company || !location || !job_type || !description || !deadline ||
      !salary.min || !salary.max
    ) {
      setError("All fields are required.");
      return;
    }

    if (Number(salary.min) > Number(salary.max)) {
      setError("Minimum salary cannot be greater than maximum salary.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (deadline < today) {
      setError("Application deadline cannot be before today's date.");
      return;
    }

    try {
      setError("");
      await axios.post("http://localhost:3001/jobs", formData); // Replace with your endpoint
      alert("Job created successfully!");
      mod(0);
      setTrig(!trig)
    } catch (err) {
      console.error(err);
      alert("Error submitting form!");
    }
  };

  return (
    <div onClick={() => mod(0)} className="fixed inset-0 bg-white/60 flex justify-center items-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="w-[700px] bg-blue-200 rounded-lg border border-blue-900/30 p-5">
        <h3 className="text-center font-bold text-2xl text-blue-900 mb-4">Create Job Opening</h3>

        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-1/2">
            <label className="text-xl mt-2 text-purple-900 font-semibold">Job Title</label>
            <input name="job_title" value={formData.job_title} onChange={handleChange} required className="border p-2" type="text" placeholder="Full Stack Developer" />

            <label className="text-xl mt-2 text-purple-900 font-semibold">Location</label>
            <select name="location" value={formData.location} onChange={handleChange} required className="border p-2">
              <option value="">Choose Preferred Location</option>
              {locs.map((l, ind) => (
                <option className="hover:bg-grey-900" key={ind} value={l}>{l}</option>
              ))}
            </select>

            <label className="text-xl mt-2 text-purple-900 font-semibold">Salary Range</label>
            <input name="min" value={formData.salary.min} onChange={handleChange} required className="border p-2 mb-2" type="number" min="0" placeholder="Min Salary" />
            <input name="max" value={formData.salary.max} onChange={handleChange} required className="border p-2" type="number" min="0" placeholder="Max Salary" />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-xl mt-2 text-purple-900 font-semibold">Company Name</label>
            <input name="company" value={formData.company} onChange={handleChange} required className="border p-2" type="text" placeholder="Amazon, Swiggy" />

            <label className="text-xl mt-2 text-purple-900 font-semibold">Job Type</label>
            <select name="job_type" value={formData.job_type} onChange={handleChange} required className="border p-2">
              <option value="">Choose Job Type</option>
              {types.map((t, ind) => (
                <option key={ind} value={t}>{t}</option>
              ))}
            </select>

            <label className="text-xl mt-2 text-purple-900 font-semibold">Application Deadline</label>
            <input name="deadline" value={formData.deadline} onChange={handleChange} required className="border p-2" type="date" />
          </div>
        </div>

        <label className="text-xl mt-4 text-blue-900 font-semibold">Job Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full h-24 p-2 border rounded mt-2"
          placeholder="Please provide description of job responsibilities to attract the right candidates..."
        ></textarea>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        <div className="flex justify-between mt-5">
          <button className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-200">Save Draft</button>
          <button onClick={() => mod(0)} className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-400">Cancel</button>
          <button onClick={handleSubmit} className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-200">Publish</button>
        </div>
      </div>
    </div>
  );
}
