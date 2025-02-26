import React, { useEffect, useState } from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBTypography, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/blogs`;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");  // Added title input
  const [newCaption, setNewCaption] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState(""); // For editing title
  const [editCaption, setEditCaption] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const token = localStorage.getItem("user_token");

  const fetchBlogs = async () => {
    if (!token) {
      console.error("🚨 Token is missing, cannot fetch blogs.");
      return;
    }

    try {
      console.log("🔍 Fetching blogs with token:", token);
      
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!Array.isArray(response.data)) {
        console.error("🚨 Response is not an array:", response.data);
        return;
      }

      console.log("✅ Blogs fetched successfully:", response.data);
      setBlogs(response.data.reverse());
    } catch (error) {
      console.error("❌ Error fetching blogs:", error.response?.data || error.message);
    }
  };

  const createBlog = async () => {
    if (!newTitle || !newCaption) return;
    try {
      await axios.post(
        API_URL,
        { title: newTitle, caption: newCaption }, // Send title and caption
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewTitle(""); 
      setNewCaption("");
      fetchBlogs();
    } catch (error) {
      console.error("❌ Error creating blog:", error.response?.data || error.message);
    }
  };

  const updateBlog = async (id) => {
    if (!editTitle || !editCaption) return;
    try {
      await axios.put(
        `${API_URL}/${id}`,
        { title: editTitle, caption: editCaption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEditId(null);
      setEditTitle("");
      setEditCaption("");
      fetchBlogs();
    } catch (error) {
      console.error("❌ Error updating blog:", error.response?.data || error.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBlogs();
    } catch (error) {
      console.error("❌ Error deleting blog:", error.response?.data || error.message);
    }
  };

  return (
    <MDBContainer>
      <MDBCard className="mt-4">
        <MDBCardBody>
          <MDBTypography tag="h4">Blog Management</MDBTypography>
          <MDBInput
            label="New Blog Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="mt-3"
          />
          <MDBInput
            label="New Blog Caption"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
            className="mt-3"
          />
          <MDBBtn onClick={createBlog} className="mt-3">
            Add Blog
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <div className="mt-4">
        {blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          blogs.map((blog) => (
            <MDBCard key={blog.id} className="mb-3 p-3">
              <MDBCardBody>
                <MDBTypography tag="h5">
                  {blog.title ? blog.title : "Untitled"} {/* Display blog title */}
                </MDBTypography>
                <p>{blog.caption}</p>
                <p className="text-muted">
                  Created at: {new Date(blog.created_at).toLocaleString()}
                </p>
                {editId === blog.id ? (
                  <>
                    <MDBInput
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="mb-2"
                      label="Edit Title"
                    />
                    <MDBInput
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      className="mb-2"
                      label="Edit Caption"
                    />
                  </>
                ) : null}
                <div className="d-flex justify-content-between">
                  {editId === blog.id ? (
                    <MDBBtn size="sm" onClick={() => updateBlog(blog.id)}>
                      Save
                    </MDBBtn>
                  ) : (
                    <MDBBtn size="sm" onClick={() => { 
                      setEditId(blog.id); 
                      setEditTitle(blog.title || ""); 
                      setEditCaption(blog.caption); 
                    }}>
                      Edit
                    </MDBBtn>
                  )}
                  <MDBBtn size="sm" color="danger" onClick={() => deleteBlog(blog.id)}>
                    Delete
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          ))
        )}
      </div>
    </MDBContainer>
  );
};

export default Blogs;
