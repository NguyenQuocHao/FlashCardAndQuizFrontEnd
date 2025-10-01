import { BrowserRouter, Routes, Route } from "react-router";
import { EditFlashCard } from "../views/EditFlashCard";
import {
  HOME_PATH,
  MY_LISTS_PATH,
  VIEW_FLASHCARD_PATH,
  EDIT_FLASHCARD_PATH,
  ADD_FLASHCARD_PATH,
} from "../const/paths.tsx";
import { ViewWordList } from "../views/ViewWordList.tsx";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PATH} element={<></>} />
        <Route path={MY_LISTS_PATH} element={<ViewWordList />} />
        <Route path={VIEW_FLASHCARD_PATH} element={<ViewWordList />} />
        <Route path={ADD_FLASHCARD_PATH} element={<EditFlashCard />} />
        <Route
          path={`${EDIT_FLASHCARD_PATH}/:word`}
          element={<EditFlashCard />}
        />
      </Routes>
    </BrowserRouter>
  );
};
