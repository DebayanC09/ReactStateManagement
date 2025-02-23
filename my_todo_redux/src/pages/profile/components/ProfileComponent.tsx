import React from "react";
import "../styles/ProfilePage.css";

type ProfileComponentProps = {
  name: string;
  email: string;
};

const ProfileComponent = ({ name, email }: ProfileComponentProps) => {
  return (
    <div className="profile_wrapper">
      <div className="profile_container">
        <div className="title">Profile</div>

        <div className="profile_group">
          <span className="profile_label">Name:</span>
          <div className="profile_text">{name}</div>
        </div>

        <div className="profile_group">
          <span className="profile_label">Email:</span>
          <div className="profile_text">{email}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
