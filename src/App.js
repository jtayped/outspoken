import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Home } from "./pages";
import { Header } from "./containers";

function App() {
  const [postsList, setPosts] = useState([]);

  const postsCollection = collection(db, "posts");

  useEffect(() => {
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
  }, [postsCollection]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home postsList={postsList} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
