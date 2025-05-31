import axios from "axios";
import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    title: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/book`);
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/book/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setFormData(book); // Pre-fill the modal with selected book data
    setShowModal(true);
    document.getElementById("edit_modal").showModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/book/${selectedBook._id}`,
        formData
      );
      fetchBooks();
      setShowModal(false);
      document.getElementById("edit_modal").close();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Books List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((item) => (
          <div key={item._id} className="border p-4 rounded shadow relative">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p>Author: {item.name}</p>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => handleEditClick(item)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => {
                  setBookToDelete(item);
                  document.getElementById("delete_modal").showModal();
                }}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Book</h3>
          <div className="space-y-2">
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="input input-bordered w-full"
            />
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Author"
              className="input input-bordered w-full"
            />
            <input
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="input input-bordered w-full"
            />
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="input input-bordered w-full"
            />
            <input
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Delete Confirmation Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <strong>{bookToDelete?.title}</strong>?
          </p>
          <div className="modal-action">
            <form method="dialog" className="space-x-2">
              <button className="btn">Cancel</button>
              <button
                type="button"
                className="btn btn-error"
                onClick={() => {
                  handleDelete(bookToDelete._id);
                  document.getElementById("delete_modal").close();
                }}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
