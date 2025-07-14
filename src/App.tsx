import { useState } from 'react'
import './App.css'
import { FlashCard } from './components/FlashCard'
import Sidebar from './components/Sidebar'
import MuiCard from './components/MuiCard'
import { BrowserRouter, Routes, Route } from "react-router";
import { EditFlashCard } from './views/EditFlashCard'
import { HOME_PATH, MY_LISTS_PATH, VIEW_FLASHCARD_PATH, EDIT_FLASHCARD_PATH, ADD_FLASHCARD_PATH } from './const/paths.tsx'

function App() {
  const [flashcards, setFlashcards] = useState([
    {
      word: {
        text: "example",
        definitions: [
          {
            definition: "A representative form or pattern",
            example: "This painting is a good example of his work.",
            difficulty: 2,
            frequency: 5,
            register: 1,
            tags: ["art", "representation"]
          }
        ]
      }
    }
  ]);

  return (
    <>
      <Sidebar />

      <BrowserRouter>
        <Routes>
          <Route path={HOME_PATH} element={<></>} />
          <Route path={MY_LISTS_PATH} element={<></>} />
          <Route path={VIEW_FLASHCARD_PATH} element={<EditFlashCard />} />
          <Route path={ADD_FLASHCARD_PATH} element={<EditFlashCard />} />
          <Route path={EDIT_FLASHCARD_PATH} element={<MuiCard />} />
        </Routes>
      </BrowserRouter>
      {/* <FlashCard word={flashcards[0].word} /> */}
      {/* <MuiCard /> */}
    </>
  )
}

export default App
