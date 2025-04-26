import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/blogs`;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState(""); // Added title input
  const [newCaption, setNewCaption] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState(""); // For editing title
  const [editCaption, setEditCaption] = useState("");
  const [editedImageFile, setEditedImageFile] = useState(null);

  const [postMessage, setPostMessage] = useState(null);
  const [postError, setPostError] = useState(null);
  const [postLoading, setPostLoading] = useState(false);

  const [putMessage, setPutMessage] = useState(null);
  const [putError, setPutError] = useState(null);
  const [putLoading, setPutLoading] = useState(false);

  const [getMessage, setGetMessage] = useState(null);
  const [getError, setGetError] = useState(null);
  const [getLoading, setGetLoading] = useState(false);

  const [deleteMessage, setDeleteMessage] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const token = localStorage.getItem("user_token");

  const fetchBlogs = async () => {
    if (!token) {
      console.error("🚨 Token is missing, cannot fetch blogs.");
      return;
    }

    setGetMessage(null);
    setGetError(null);
    setGetLoading(true);

    try {
      console.log("🔍 Fetching blogs with token:", token);

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGetMessage(response.data.message);

      if (!Array.isArray(response.data)) {
        console.error("🚨 Response is not an array:", response.data);
        return;
      }

      console.log("✅ Blogs fetched successfully:", response.data);
      setBlogs(response.data.reverse());
    } catch (error) {
      console.error(
        "❌ Error fetching blogs:",
        error.response?.data?.detail || error.message || error.response?.data || "Something went wrong. Please try again."
      );
      setGetError(
        error.response?.data?.detail || error.message || error.response?.data || "Something went wrong. Please try again."
      );
    } finally {
      setGetLoading(false);
    }
  };

  const createBlog = async () => {
    setPostMessage(null);
    setPostError(null);
    setPostLoading(true);

    if (!newTitle || !newCaption) return;

    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("caption", newCaption);
      if (selectedImageFile) {
        formData.append("image_file", selectedImageFile); // `selectedImageFile` should be a File object
      }
  
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPostMessage(response.data.message);
  
      setNewTitle("");
      setNewCaption("");
      setSelectedImageFile(null);
      fetchBlogs();
    } catch (error) {
      console.error(
        "❌ Error creating blogs:",
        error.response?.data?.detail || error.message || error.response?.data || "Something went wrong. Please try again."
      );
      setPostError(
        error.response?.data?.detail || error.message || error.response?.data || "Something went wrong. Please try again."
      );
    } finally {
      setPostLoading(false);
    }
  };
  

  // const createBlog = async () => {
  //   if (!newTitle || !newCaption) return;
  //   try {
  //     await axios.post(
  //       API_URL,
  //       { title: newTitle, caption: newCaption }, // Send title and caption
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     setNewTitle("");
  //     setNewCaption("");
  //     fetchBlogs();
  //   } catch (error) {
  //     console.error(
  //       "❌ Error creating blog:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  const updateBlog = async (id) => {
    setPutMessage(null);
    setPutError(null);
    setPutLoading(true);

    try {
      const formData = new FormData();
  
      if (editTitle?.trim()) formData.append("title", editTitle);
      if (editCaption?.trim()) formData.append("caption", editCaption);
      if (editedImageFile) formData.append("image_file", editedImageFile);
  
      if (!formData.has("title") && !formData.has("caption") && !formData.has("image_file")) {
        alert("Please update at least one field (title, caption, or image)");
        return;
      }
  
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPutMessage(response.data.message);
  
      setEditId(null);
      setEditTitle("");
      setEditCaption("");
      setEditedImageFile(null);
      fetchBlogs();
    } catch (error) {
      console.error(
        "❌ Error updating blogs:",
        error.response?.data?.detail || error.message || error.response?.data || "Something went wrong. Please try again."
      );
      setPutError(
        error.response?.data?.detail || error.message || error.response?.data || "Something went wrong. Please try again."
      );
    } finally {
      setPutLoading(false);
    }
  };  

  // const updateBlog = async (id) => {
  //   if (!editTitle || !editCaption) return;
  //   try {
  //     await axios.put(
  //       `${API_URL}/${id}`,
  //       { title: editTitle, caption: editCaption },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     setEditId(null);
  //     setEditTitle("");
  //     setEditCaption("");
  //     fetchBlogs();
  //   } catch (error) {
  //     // console.error(
  //     //   "❌ Error updating blog:",
  //     //   error.response?.data || error.message
  //     // );
  //     const errorMsg = error.response?.data?.detail || error.message || error.response?.data;
  //     console.error("❌ Error updating blog:", errorMsg);
  //     alert(`Failed to update blog: ${errorMsg}`);
  //   }
  // };

  const deleteBlog = async (id) => {
    setDeleteMessage(null);
    setDeleteError(null);
    setDeleteLoading(true);
    
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDeleteMessage(response.data.message);

      fetchBlogs();
    } catch (error) {
      console.error(
        "❌ Error deleting blogs:",
        error.response?.data?.detail || error.message || error.response?.data || "Something went wrong. Please try again."
      );
      setDeleteError(
        error.response?.data?.detail || error.message || error.response?.data || "Something went wrong. Please try again."
      );
    } finally {
      setDeleteLoading(false);
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
                  {blog.title ? blog.title : "Untitled"}{" "}
                  {/* Display blog title */}
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
                    <MDBBtn
                      size="sm"
                      onClick={() => {
                        setEditId(blog.id);
                        setEditTitle(blog.title || "");
                        setEditCaption(blog.caption);
                      }}
                    >
                      Edit
                    </MDBBtn>
                  )}
                  <MDBBtn
                    size="sm"
                    color="danger"
                    onClick={() => deleteBlog(blog.id)}
                  >
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
