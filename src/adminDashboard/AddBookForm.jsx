import axios from 'axios';
import { useState } from 'react';

export default function AddBookForm() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    title: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/book`, form);
      alert("Book added successfully!");
      console.log(response.data);
      setForm({
        name: '',
        price: '',
        category: '',
        image: '',
        title: '',
      });
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add book.");
    }
  };

  return (
    <>
    <br />
    <br />
    <br />
    <h1 className='ps-20 text-3xl'>Add Book Form</h1>
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      {['name', 'title', 'category', 'image', 'price'].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium">{field}</label>
          <input
            type={field === 'price' ? 'number' : 'text'}
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      ))}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">
        Add Book
      </button>
    </form>
    </>
  );
}
