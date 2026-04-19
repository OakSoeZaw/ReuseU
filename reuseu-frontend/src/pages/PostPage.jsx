import { useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import "../styles/PostPage.css";
import { createItem } from "../services/itemServices";

function PostPage() {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const item = await createItem(title, description, user.id, image);
      console.log("Posted:", item);
      navigate("/feed");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="post-page">
      <NavBar />

      <main className="post-main">
        <form className="post-card" onSubmit={handleSubmit}>
          <div className="post-top">
            <label className="post-image-box">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="post-image-preview"
                />
              ) : (
                <div className="post-image-placeholder">
                  <span className="post-image-plus">+</span>
                  <p>Upload Photo</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>

            <div className="post-info">
              <div className="form-group">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Camera"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Deadline</label>
                <input
                  type="date"
                  className="form-input"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="post-bottom">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Write details about the item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            Create Post
          </button>
        </form>
      </main>
    </div>
  );
}

export default PostPage;
