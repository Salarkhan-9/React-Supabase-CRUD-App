import React, { useState, useEffect } from "react";
import { supabase } from "./createClient";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "", age: "" });
  const [user2, setUser2] = useState({id:'', name: "", age: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("users").select("*");
    setUsers(data);
  }

  async function createUsers() {
    await supabase.from("users").insert({ name: user.name, age: user.age });
    fetchUsers();
    alert("User added successfully");
  }

  async function deleteUsers(userId) {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (error) {
      console.log(error.message);
    } else {
      console.log("User deleted successfully");
      fetchUsers(); // Refresh the user list after deletion
      alert("User deleted successfully");
    }
  }

  function displayUsers(userId) {
    users.map((user) => {
      if (user.id === userId) {
        setUser2({ id:user.id,name: user.name, age: user.age });
      }
      return null; // Add this line to fix the map function
    });
  }






async function updateUser(userId) {
  const { error } = await supabase
    .from("users")
    .update({ name: user2.name, age: user2.age })
    .eq("id", userId);
  fetchUsers(); // Refresh the user list after updating
}




  function handleChange(event) {
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  function handleChange2(event) {
    setUser2((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center min-h-screen from-purple-200 via-purple-300 to-purple-500 bg-gradient-to-br">
      <div className="flex items-center justify-center w-full max-w-screen-lg p-4 flex-col">
        <h1 className=" mb-8 text-3xl font-extrabold md:text-6xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          CRUD-App
        </h1>
        <h1 className=" mb-8 text-xl font-extrabold md:text-5xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Create&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </h1>
        <div className="flex justify-between w-full">
          {/* Entry Form 1*/}

          <form className="w-1/3 mr-5 " onSubmit={createUsers}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="h-10 w-full mb-2 rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Age"
              name="age"
              className="h-10 w-full mb-2 rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600"
              onChange={handleChange}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="h-10 w-32 mb-4 rounded-lg border-2 border-emerald-600 bg-emerald-500 text-emerald-50 shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600"
              >
                Create
              </button>
            </div>
          </form>

          {/* Entry Form 2*/}
          <form className="w-1/3 mr-4" onSubmit={()=>updateUser(user2.id)}>
            <input
              type="text"
              defaultValue={user2.name}
              name="name"
              className="h-10 w-full mb-2 rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600"
              onChange={handleChange2}
            />
            <input
              type="text"
              defaultValue={user2.age}
              name="age"
              className="h-10 w-full mb-2 rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600"
              onChange={handleChange2}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="h-10 w-32 mb-4 rounded-lg border-2 border-orange-600 bg-orange-500 text-orange-50 shadow-lg hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-white uppercase bg-blue-500">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6 mr-5">
                  Age
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-white border-b">
                  <td className="py-4 px-6">{user.id}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.age}</td>
                  <td>
                    <button
                      onClick={() => {
                        displayUsers(user.id);
                      }}
                      className="h-8 w-20 rounded-lg bg-yellow-500 text-white shadow-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-600 mr-3"
                    >
                      {" "}
                      Edit{" "}
                    </button>
                    <button
                      onClick={() => {
                        deleteUsers(user.id);
                      }}
                      className="h-8 w-20 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-600 mr-3"
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
