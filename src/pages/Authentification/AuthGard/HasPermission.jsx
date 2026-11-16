import React, { cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../../../redux/features/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function HasPermission(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateUser = useSelector((state) => state.user.value);
  const stateClient = useSelector((state) => state.client.value);
  // console.log(stateClient)
  const baseURL = process.env.REACT_APP_API_URL;
  const signout = async () => {
    if (stateUser && stateUser.user && stateUser.user._id) {
      await axios
        .post(baseURL + "/auth/logout", {
          user: stateUser.user._id,
        })
        .then(async (response) => {
          navigate("/login");
          dispatch(logout());
        })
        .catch((error) => {
          console.error("Error logging out:", error);
          // Handle error as needed
        });
    } 
  };
  

  let isExist = -1;

  if (Object.keys(stateUser).length > 0) {
    if (
      stateUser &&
      stateUser.user &&
      stateUser.user.RoleSchema &&
      'Permission' in stateUser.user.RoleSchema
    ) {
      isExist = stateUser.user.RoleSchema.Permission.findIndex((p) =>
        props.permission.includes(p.index)
      );
    } else {
      signout()
    }

  } else if (Object.keys(stateClient).length > 0) {
    if (
      stateClient &&
      stateClient.client &&
      'permission' in stateClient.client
    ) {
      isExist = stateClient.client.permission.findIndex((p) =>
      props.permission.includes(p.index)

    );
    console.log("--------------exists",isExist)
    } else {
      signout()
    }

  } else {
    signout()
  }

  const preventDefaultClick = (e) => {
    e.preventDefault();
    toast.dismiss();
    toast.error("Vous n'avez pas le droit");
  };
  let child = cloneElement(
    props.children,
    isExist == -1
      ? {
        onClick: preventDefaultClick,
        style: { opacity: 0.5, "pointer-events": "none" },
      }
      : null
  );

  return <div style={{ cursor: "pointer" }}>{child}</div>;
}
