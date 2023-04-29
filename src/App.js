import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { db, auth } from "./config/firebase";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { Home, SignUp } from "./pages";
import userEvent from "@testing-library/user-event";

function App() {
  const [postsList, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const postsCollection = collection(db, "posts");
    const getPostsList = async () => {
      try {
        const data = await getDocs(postsCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getPostsList();
  }, []);

  async function getUserData() {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  if (auth?.currentUser?.uid) {
    getUserData();
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              postsList={postsList}
              isLoading={isLoading}
              userData={userData}
            />
          }
        />
        <Route exact path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
