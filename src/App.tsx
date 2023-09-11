import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/NoteDetails";
import Navigation from "./pages/Navigation";
import Page404 from "./pages/Page404";
import CreateEditNote from "./pages/CreateEditNote";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index path="/" element={<Home />} />
          <Route path="note/:id" element={<Details />} />
          <Route path="create" element={<CreateEditNote />} />
          <Route path="edit/:id" element={<CreateEditNote />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
