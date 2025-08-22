import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getuserInfo, updateUser } from '../service/user';
import { fetchUpdatedUser, resetStatus } from '../../toolkit/userSlice';

import image from '../assets/image.png';
import '../styles/Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { loading, user, message, success } = useSelector(
    (state) => state.user
  );
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });

  const handleNameChange = (e) => {
    setProfile({
      ...profile,
      name: e.target.value,
    });
  };

  useEffect(() => {
    if (user?.name && user?.email) {
      setProfile({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      toast.success(message || 'Profile updated successfully');
    } else if (message && !success) {
      toast.error(message);
    }
    dispatch(resetStatus());
  }, [success, message, dispatch]);

  const handleUpdateUser = () => {
    if (!profile.name.trim()) {
      toast.warning("Username can't be empty");
      return;
    }
    if (user?.name == profile?.name) {
      toast.warning('Please update the details');
      return;
    }

    dispatch(
      fetchUpdatedUser({
        func: updateUser,
        name: { name: profile.name },
        getuserInfo,
      })
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Profile Information</h2>
          <p>Update your personal details</p>
        </div>

        <div className="profile-content">
          <div className="profile-image-section">
            <img src={image} alt="profile" className="profile-image" />
            {/* <button className="change-photo-btn">Change Photo</button> */}
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-input"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleNameChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-input disabled"
                id="email"
                name="email"
                value={profile.email}
                disabled
              />
            </div>

            <button className="update-btn" onClick={handleUpdateUser}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
