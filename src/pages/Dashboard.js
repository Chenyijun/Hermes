import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logOut } from "../firebase";
import { query, collection, getDocs, where, orderBy } from "firebase/firestore";
import { useCollectionData} from "react-firebase-hooks/firestore";
import Channel from "./Chat"
import NavBar from "./NavBar"
import { MainWrapper } from "../components/wrappers"
import UserList from "./UserList"

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  const usersRef = collection(db, 'users');
  const usersQuery = query(usersRef, orderBy("name"));
  const [users] = useCollectionData(usersQuery);
  console.log("users", users)
  const navigate = useNavigate();


  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <MainWrapper>
      <NavBar name={name}/>
      <UserList user={user} users={users} db={db} loading={loading} navigate={navigate} />
      <Channel user={user} users={users} db={db} loading={loading} navigate={navigate} />
     </MainWrapper>
  );
}
export default Dashboard;