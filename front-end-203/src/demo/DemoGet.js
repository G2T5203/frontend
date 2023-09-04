import axios from 'axios';
import { useEffect, useState } from 'react';

function DemoGet() {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [helloWorld, setHelloWorld] = useState("");
    const [allUsers, setAllUsers] = useState([]);


    return (
        <div className="DemoGet">
            <button onClick={GetHelloWorld}>DEMO GET</button>
            <p>{helloWorld}</p>
            <button onClick={GetAllUsers}>DEMO GET ALL USERS</button>
            <div>
                {allUsers.length > 0 ? (
                    allUsers.map(item => (
                        <div key={item.userId}>
                            {item.salutation} {item.firstName} {item.lastName}
                            <br/>
                            {item.email}
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );


    function GetHelloWorld() {
        axios.get(apiUrl)
            .then((response) => {
                console.log(response.status)
                console.log(response.data)
                console.log(response.data.body)
                setHelloWorld(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function GetAllUsers() {
        axios.get(apiUrl + "/users")
            .then((response) => {
                console.log(response.status)
                console.log(response.data)
                console.log(response.data.body)
                setAllUsers(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
}
  
export default DemoGet;