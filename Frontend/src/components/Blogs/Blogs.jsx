import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Blogs.css";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";
import { logoutUser } from "../firebase/firebase.js";
import handleSignOut from "../Chat/Chat.jsx"

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/blogs`;

const Blogs = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user_token");
  const [blogs, setBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editedImageFile, setEditedImageFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleBlogs, setVisibleBlogs] = useState(6);

  // State for API operations
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
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on search query
  useEffect(() => {
    if (blogs.length > 0) {
      const filtered = blogs.filter(blog => 
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        blog.caption?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedBlogs(filtered);
    }
  }, [blogs, searchQuery]);

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
      setDisplayedBlogs(response.data.reverse());
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
        formData.append("image_file", selectedImageFile);
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

  const deleteBlog = async (id) => {
    setDeleteMessage(null);
    setDeleteError(null);
    setDeleteLoading(true);
    
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDeleteMessage(response.data?.message || "Blog deleted successfully");
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImageFile(e.target.files[0]);
    }
  };

  const handleEditImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditedImageFile(e.target.files[0]);
    }
  };

  const loadMoreBlogs = () => {
    setVisibleBlogs(prev => prev + 6);
  };

  return (
    <>
    <div className="home-logo-container">
    <img src={logo} alt="Cyberlooper Logo" className="home-logo" />
  </div>
  {isLoggedIn ? (
    <p className="home-login-btn">
    </p>
  ) : (
    <>
      <button className="home-login-btn" onClick={() => navigate("/login")}>
        Log in
      </button>
      <div className="home-try-button" onClick={() => navigate("/signup")}>
        <span className="try-text">Try it free</span>
        <i className="pi pi-arrow-up-right icon-arrow"></i>
      </div>
    </>
  )}
  <div className="kb-blog-background">
    <div className="kb-blog-page">
      {/* Hero Section */}
      <div className="kb-hero-section">
        <h1 className="kb-hero-title">
          Welcome to the Knowledge Base (Our Blog)
        </h1>
        <p className="kb-hero-subtitle">
          Explore our collection of articles, guides, and updates to master the art of getting things done with your AI assistant—safely and efficiently.
        </p>
        
        {/* Search Bar */}
        <div className="kb-search-container">
          <input 
            type="text" 
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="kb-search-input"
          />
          <div className="kb-search-icon"></div>
        </div>

        {/* Admin Toggle */}
        <div className="kb-admin-toggle">
          <button 
            onClick={() => setIsAdminView(!isAdminView)}
            className="kb-toggle-button"
          >
            {isAdminView ? "View Public Blog" : "Admin Panel"}
          </button>
        </div>
      </div>

      {isAdminView ? (
        <div className="kb-admin-section">
          <div className="kb-admin-panel">
            <h2 className="kb-admin-heading">Blog Management</h2>
            
            <div className="kb-form-group">
              <label className="kb-form-label">
                Blog Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="kb-form-input"
                placeholder="Enter blog title"
              />
            </div>
            
            <div className="kb-form-group">
              <label className="kb-form-label">
                Blog Caption
              </label>
              <textarea
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                className="kb-form-textarea"
                placeholder="Enter blog caption"
              />
            </div>
            
            <div className="kb-form-group">
              <label className="kb-form-label">
                Blog Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="kb-form-file"
              />
            </div>
            
            <button
              onClick={createBlog}
              disabled={postLoading}
              className="kb-submit-button"
            >
              {postLoading ? "Adding..." : "Add Blog"}
            </button>
            
            {postMessage && (
              <p className="kb-success-message">{postMessage}</p>
            )}
            {postError && (
              <p className="kb-error-message">{postError}</p>
            )}
          </div>
          
          <h2 className="kb-admin-subheading">Manage Existing Blogs</h2>
          
          {getLoading ? (
            <p className="kb-loading-text">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="kb-empty-text">No blogs available.</p>
          ) : (
            <div className="kb-blog-list">
              {blogs.map((blog) => (
                <div key={blog.id} className="kb-blog-list-item">
                  <div className="kb-blog-list-content">
                    {blog.image_url && (
                      <div className="kb-blog-thumbnail">
                        <img 
                          src={blog.image_url} 
                          alt={blog.title || "Blog image"} 
                          className="kb-blog-image"
                        />
                      </div>
                    )}
                    
                    <div className="kb-blog-details">
                      <h3 className="kb-blog-title">
                        {blog.title || "Untitled"}
                      </h3>
                      <p className="kb-blog-caption">
                        {blog.caption}
                      </p>
                      <p className="kb-blog-date">
                        Created at: {new Date(blog.created_at).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="kb-blog-actions">
                      <button
                        onClick={() => {
                          setEditId(blog.id);
                          setEditTitle(blog.title || "");
                          setEditCaption(blog.caption);
                        }}
                        className="kb-edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        disabled={deleteLoading}
                        className="kb-delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {editId === blog.id && (
                    <div className="kb-edit-form">
                      <h4 className="kb-edit-heading">Edit Blog</h4>
                      
                      <div className="kb-form-group">
                        <label className="kb-form-label">
                          Edit Title
                        </label>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="kb-form-input"
                        />
                      </div>
                      
                      <div className="kb-form-group">
                        <label className="kb-form-label">
                          Edit Caption
                        </label>
                        <textarea
                          value={editCaption}
                          onChange={(e) => setEditCaption(e.target.value)}
                          className="kb-form-textarea"
                        />
                      </div>
                      
                      <div className="kb-form-group">
                        <label className="kb-form-label">
                          Update Image
                        </label>
                        <input
                          type="file"
                          onChange={handleEditImageChange}
                          className="kb-form-file"
                        />
                      </div>
                      
                      <div className="kb-button-group">
                        <button
                          onClick={() => updateBlog(blog.id)}
                          disabled={putLoading}
                          className="kb-save-button"
                        >
                          {putLoading ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                          onClick={() => {
                            setEditId(null);
                            setEditTitle("");
                            setEditCaption("");
                            setEditedImageFile(null);
                          }}
                          className="kb-cancel-button"
                        >
                          Cancel
                        </button>
                      </div>
                      
                      {putMessage && (
                        <p className="kb-success-message">{putMessage}</p>
                      )}
                      {putError && (
                        <p className="kb-error-message">{putError}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="kb-public-view">
          <div className="kb-blog-grid">
            {displayedBlogs.length === 0 ? (
              <p className="kb-no-results">No blogs found matching your search.</p>
            ) : (
              <>
                {displayedBlogs.slice(0, visibleBlogs).map((blog) => (
                  <div key={blog.id} className="kb-blog-card">
                    <div className="kb-blog-card-image">
                      {blog.image_url ? (
                        <img src={blog.image_url} alt={blog.title || "Blog"} />
                      ) : (
                        <div className="kb-placeholder-image"></div>
                      )}
                    </div>
                    <div className="kb-blog-card-content">
                      <div className="kb-blog-card-header">
                        <span className="kb-blog-card-category">Knowledge Base</span>
                        <div className="kb-blog-card-title-wrapper">
                          <h3 className="kb-blog-card-title">{blog.title || "Untitled"}</h3>
                          <div className="kb-blog-card-icon"></div>
                        </div>
                        <p className="kb-blog-card-excerpt">{blog.caption}</p>
                      </div>
                      <div className="kb-blog-card-author">
                        <div className="kb-blog-card-avatar"></div>
                        <div className="kb-blog-card-author-info">
                          <p className="kb-blog-card-author-name">Admin</p>
                          <p className="kb-blog-card-date">{new Date(blog.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          
          {visibleBlogs < displayedBlogs.length && (
            <div className="kb-load-more-container">
              <button onClick={loadMoreBlogs} className="kb-load-more-button">
                <span className="kb-load-more-icon"></span>
                <span>Load More</span>
              </button>
            </div>
          )}
        </div>
      )}

    </div>
    </div>
    <div className="join-future-section">
        <div className="join-future-content">
          <h2 className="join-title">Join the Future of Work</h2>
          <p className="join-subtitle">Sign up now to experience the AI advantage.</p>
        </div>
        <button className="join-future-btn" onClick={() => navigate("/signup")}>
          Join for free
        </button>
      </div>
    </>
  );
};

export default Blogs;