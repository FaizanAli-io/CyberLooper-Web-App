import React, { useEffect, useState } from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBTypography, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/blogs`;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newCaption, setNewCaption] = useState("");
  const [editId, setEditId] = useState(null);
  const [editCaption, setEditCaption] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(API_URL);
      setBlogs(response.data.reverse());
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const createBlog = async () => {
    if (!newCaption) return;
    try {
      await axios.post(API_URL, { caption: newCaption });
      setNewCaption("");
      fetchBlogs();
    } catch (error) {
      console.error("Error creating blog", error);
    }
  };

  const updateBlog = async (id) => {
    if (!editCaption) return;
    try {
      await axios.put(`${API_URL}/${id}`, { caption: editCaption });
      setEditId(null);
      setEditCaption("");
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  return (
    <MDBContainer>
      <MDBCard className="mt-4">
        <MDBCardBody>
          <MDBTypography tag="h4">Blog Management</MDBTypography>
          <MDBInput label="New Blog Caption" value={newCaption} onChange={(e) => setNewCaption(e.target.value)} className="mt-3" />
          <MDBBtn onClick={createBlog} className="mt-3">Add Blog</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <div className="mt-4">
        {blogs.map((blog, index) => (
          <MDBCard key={blog.id} className="mb-3 p-3">
            <MDBCardBody>
              <MDBTypography tag="h5">Blog {index + 1}:</MDBTypography>
              <p>{blog.caption}</p>
              <p className="text-muted">Created at: {new Date(blog.created_at).toLocaleString()}</p>
              {editId === blog.id ? (
                <MDBInput value={editCaption} onChange={(e) => setEditCaption(e.target.value)} className="mb-2" />
              ) : null}
              <div className="d-flex justify-content-between">
                {editId === blog.id ? (
                  <MDBBtn size="sm" onClick={() => updateBlog(blog.id)}>Save</MDBBtn>
                ) : (
                  <MDBBtn size="sm" onClick={() => { setEditId(blog.id); setEditCaption(blog.caption); }}>Edit</MDBBtn>
                )}
                <MDBBtn size="sm" color="danger" onClick={() => deleteBlog(blog.id)}>Delete</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>
    </MDBContainer>
  );
};

export default Blogs;
