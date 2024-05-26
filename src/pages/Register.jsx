import React, { useState } from "react";
import "./Register.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Add from "../img/addAvatar.png";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create user profile in Firestore
      const userProfile = {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: "",
      };

      if (file) {
        // Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(async () => {
          const downloadURL = await getDownloadURL(storageRef);

          // Update profile with avatar URL
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });

          userProfile.photoURL = downloadURL;

          await setDoc(doc(db, "users", res.user.uid), userProfile);
          // Create empty user chats on Firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        });
      } else {
        // Update profile without avatar
        await updateProfile(res.user, {
          displayName,
        });

        await setDoc(doc(db, "users", res.user.uid), userProfile);
        // Create empty user chats on Firestore
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="logo">Chatwell</h1>
        <h2 className="title">Register</h2>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Display Name" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <div className="avatar-upload">
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file">
              <img src={Add} alt="Add Avatar" />
              <span>Add an Avatar (Optional)</span>
            </label>
          </div>
          <button disabled={loading}>Sign Up</button>
          {loading && <span>Uploading and compressing the image, please wait...</span>}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
