// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import User from "./components/User";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    axios
      .post("http://localhost:3001/createUser", { name, age, username })
      .then((response) => {
        alert("사용자등록성공");
        setListOfUsers([...listOfUsers, { name, age, username }]);
      });
  };

  return (
    <div className="App">
      <h1> List of Users </h1>
      <div className="grid">
        {listOfUsers.map((user) => {
          return (
            <div>
              <User user={user} />
            </div>
          );
        })}
      </div>

      {/* <div>
        {listOfUsers.map((user) => {
          return (
            <div>
              <User user={user} />
            </div>
          );
        })}
      </div> */}

      <div className="register">
        <input
          className="input"
          type="text"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(event) => setAge(event.target.value)}
        />
        <input
          type="text"
          placeholder="UserName"
          onChange={(event) => setUsername(event.target.value)}
        />
        <button className="button" onClick={createUser}>
          create User
        </button>
      </div>
    </div>
  );
}

export default App;
