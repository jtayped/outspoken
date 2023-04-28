import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { db, auth } from "./config/firebase";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { Home, SignUp } from "./pages";
import { Header } from "./containers";

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

  async function getUserData(uid) {
    try {
      const docRef = doc(db, "/users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No document found!");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!isLoading && auth.currentUser === undefined) {
    getUserData(auth.currentUser.uid).then((data) => {
      setUserData(data);
    });
  }

  console.log(userData);

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

  return (
    <BrowserRouter>
      <Header userData={userData} isLoading={isLoading} />
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
