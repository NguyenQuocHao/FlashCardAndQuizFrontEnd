import Input from "@mui/material/Input";
import type { Word } from "../components/FlashCard";
import { useParams } from "react-router";

interface EditFlashCardProps {
    word: Word;
}

export const EditFlashCard = () => {
    const { word } = useParams<{ word: string }>();

    // Mock word object for demonstration purposes
    const wordObj = {
        word: {
            text: word,
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

    return (
        <div className="edit-flashcard">
            <h2>Edit {word}</h2>
            <form>
                {wordObj.word.definitions.map((def, index) => (
                    <div key={index}>
                        <div>
                            <label>definition: </label>
                            <Input />
                        </div>
                        <div><label>example:</label><Input /></div>
                        <div><label>difficulty:</label><Input /></div>
                        <div> <label>frequency:</label><Input /></div>
                        <div><label>register:</label><Input /></div>
                        <div><label>tags:</label><Input /></div>
                    </div>
                ))}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}