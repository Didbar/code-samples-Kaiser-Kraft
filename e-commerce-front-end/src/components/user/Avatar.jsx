import React, { useState, useEffect } from "react";

const Avatar = ({ user }) => {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar.url);
    }
  }, [user.avatar]);
  return (
    <>
      <figure className="avatar avatar-profile">
        <img
          className="rounded-circle img-fluid"
          src={avatar}
          alt={user.name}
          title="user Avatar"
        />
      </figure>
    </>
  );
};

export default Avatar;
