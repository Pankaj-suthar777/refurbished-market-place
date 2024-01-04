import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { SetLoader } from "../../redux/loadersSlice";
import { UpdateProductStatus } from "../../apicalls/product";
import { GetAllUser, UpdateUserStatus } from "../../apicalls/users";

function Users() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  async function getData() {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllUser();
      dispatch(SetLoader(false));
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  async function onStatusUpdate(id, status) {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateUserStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        setUsers(response.data);
        getData();
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-col mt-2 gap-2">
        {users &&
          users.map((user) => {
            return (
              <div className="flex justify-between border border-solid p-2 rounded-[10px]">
                <div className="break-all break-words w-[450px]">
                  <b>Name : </b>
                  {user.name}
                  <p>
                    <b>Email : </b>
                    {user.email}
                  </p>
                  <p>
                    <b>Role : </b>
                    <span className="uppercase">{user.role}</span>
                  </p>

                  <p>
                    <b>Created At : </b>
                    {moment(user.createdAt).format("DD-MM-YY hh:mm A")}
                  </p>
                  <p>
                    <b>Status : </b>
                    <span className="uppercase">{user.status}</span>
                  </p>
                </div>

                <div className="flex gap-5 items-center">
                  {user.status === "active" && (
                    <span
                      className="underline cursor-pointer"
                      onClick={() => {
                        onStatusUpdate(user._id, "blocked");
                      }}
                    >
                      Block
                    </span>
                  )}
                  {user.status === "blocked" && (
                    <span
                      className="underline cursor-pointer"
                      onClick={() => {
                        onStatusUpdate(user._id, "active");
                      }}
                    >
                      Unblock
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Users;
