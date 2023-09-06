import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/NoteDetails";
import NoteForm from "./components/NoteForm";
import Navigation from "./components/Navigation";
import Page404 from "./components/Page404";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="note/:id" element={<Details />} />
          <Route path="create" element={<NoteForm />} />
          <Route path="edit/:id" element={<NoteForm />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
