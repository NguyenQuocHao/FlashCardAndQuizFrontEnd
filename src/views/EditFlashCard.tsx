// import type { Word } from "../components/FlashCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "../style.css";
import { DefinitionInputs } from "../components/DefinitionInputs";

interface Level {
  level: number;
  label: string;
}

export const EditFlashCard = () => {
  const { word } = useParams<{ word: string }>();
  const [tags, setTags] = useState([]);
  const [difficulties, setDifficulties] = useState<Level[]>([]);
  const [frequencies, setFrequencies] = useState<Level[]>([]);
  const [registers, setRegisters] = useState<Level[]>([]);
  const [card, setCard] = useState({
    text: word,
    meanings: [
      {
        explanation: "A representative form or pattern",
        examples: ["example sentence 1", "example sentence 2"],
        difficulty: 2,
        frequency: 5,
        register: 1,
        tags: ["art", "representation"],
      },
    ],
  });
  const [openDef, setOpenDef] = useState([]);

  async function createCard() {
    const url = "https://localhost:44366/api/card/create";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getTags() {
    const url = "https://localhost:44366/api/tag/getAll";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = (await response.json()).map((t) => {
        return { id: t.tagId, name: t.tagName };
      });
      setTags(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getDifficulties() {
    const url = "https://localhost:44366/api/difficulty/get";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setDifficulties(await response.json());
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getFrequencies() {
    const url = "https://localhost:44366/api/frequency/get";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setFrequencies(await response.json());
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getRegisters() {
    const url = "https://localhost:44366/api/register/get";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setRegisters(await response.json());
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleLevelChange = (event, levelType, explanation) => {
    let meaning = card.meanings.find((m) => m.explanation === explanation);
    if (!meaning) {
      alert("Meaning not found");
      return;
    }
    meaning[levelType] = event.target.value;

    setCard({ ...card, meanings: [...card.meanings] });
  };

  const handleExampleChange = (event, newValues, explanation) => {
    let meaning = card.meanings.find((m) => m.explanation === explanation);
    if (!meaning) {
      alert("Meaning not found");
      return;
    }
    console.log(event);

    meaning.tags = newValues.map((e) => e.name);
    setCard({ ...card, meanings: [...card.meanings] });
    // console.log(card);
  };

  useEffect(() => {
    getTags();
    getDifficulties();
    getFrequencies();
    getRegisters();
  }, []);

  return (
    <div className="edit-flashcard">
      <h2>Edit {word}</h2>
      <form>
        {card.meanings.map((def, index) => (
          <div key={index}>
            <DefinitionInputs
              meaning={def}
              registers={registers}
              difficulties={difficulties}
              frequencies={frequencies}
              tags={tags}
              key={index}
              order={index + 1}
            />
          </div>
        ))}

        <div className="row">
          <button
            type="submit"
            className="button"
            style={{
              backgroundColor: "teal",
              color: "white",
              marginTop: "10px",
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
