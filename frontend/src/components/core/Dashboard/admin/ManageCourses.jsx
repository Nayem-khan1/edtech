import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { createCategory } from '../../../../services/operations/categories';

const ManageCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await createCategory(token, { name, description });
      toast.success("Category created successfully");
      setName("");
      setDescription("");
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  return (
    <div className="text-white">
      <h1>Manage Courses</h1>
      <p>List and manage courses here.</p>

      {user.accountType === "Admin" && (
        <form onSubmit={handleCreateCategory} className="category-form">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Create Category</button>
        </form>
      )}
    </div>
  );
};

export default ManageCourses;
