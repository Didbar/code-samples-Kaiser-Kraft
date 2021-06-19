import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Avatar from "./Avatar";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name} Profile`} />
          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <Avatar user={user} />
              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                My Orders
              </Link>

              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
