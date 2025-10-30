// import type { Word } from "../components/FlashCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "../style.css";
import { DefinitionInputs } from "../components/DefinitionInputs";
import { fetchApi, updateApi } from "../utils/http";
import { CustomizedAlert } from "../components/CustomizedAlert";
import { isObjectEmpty } from "../utils/obj";
import { generateRandomString } from "../utils/string";
import { FloatButton } from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";

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
  const [wordTypes, setWordTypes] = useState([]);
  const [card, setCard] = useState({});
  const [open, setOpen] = useState(false);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [openFloatButton, setOpenFloatButton] = useState(false);

  const getTags = async () => {
    fetchApi("https://localhost:44366/api/tag/getAll").then((data) => {
      const result = data.map((t) => {
        return { id: t.id, name: t.name };
      });
      setTags(result);
    });
  };

  const getDifficulties = async () => {
    fetchApi("https://localhost:44366/api/difficulty/get").then((data) => {
      setDifficulties(data);
    });
  };

  const getFrequencies = async () => {
    fetchApi("https://localhost:44366/api/frequency/get").then((data) => {
      setFrequencies(data);
    });
  };

  const getRegisters = async () => {
    fetchApi("https://localhost:44366/api/register/get").then((data) => {
      setRegisters(data);
    });
  };

  const getWordTypes = async () => {
    fetchApi("https://localhost:44366/api/word-type/get").then((data) => {
      setWordTypes(data);
    });
  };

  const getWord = async () => {
    fetchApi(`https://localhost:44366/api/card/getWord/${word}`).then(
      (data) => {
        if (!data) {
          setCard({});
          return;
        }

        let result = {
          wordId: data.card.wordId,
          text: data.card.wordContent,
          date: data.card.cardDate,
          meanings: data.meanings.map((m) => ({
            id: m.id,
            description: m.description,
            note: m.note,
            examples: m.examples,
            difficulty: m.difficulty,
            importance: m.importance,
            frequency: m.frequency,
            register: m.register,
            tags: m.tags.map((t) => t.name),
            wordType: m.wordType,
          })),
        };

        setCard(result);
      }
    );
  };

  const saveChanges = async () => {
    const requestBody = {
      meanings: card.meanings.map((m) => ({
        id: m.id,
        description: m.description,
        note: m.note,
        wordType: m.wordType,
        tags: m.tags,
        examples: m.examples,
        difficulty: m.difficulty,
        register: m.register,
        frequency: m.frequency,
        importance: m.importance,
      })),
      deletedIds: deletedIds,
    };

    updateApi(
      `https://localhost:44366/api/word/${card.wordId}/meanings`,
      requestBody
    )
      .then((data) => {
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error updating meanings:", error);
      });
  };

  const addMeaning = () => {
    const newMeaning = {
      id: 0,
      tempId: generateRandomString(7),
      description: "",
      note: "",
      wordType: word.split(" ").length > 1 ? "WordGroup" : "Noun",
      tags: [],
      examples: [],
      difficulty: 2,
      register: 2,
      frequency: 2,
      importance: 2,
    };

    let newCard = { ...card };
    newCard.meanings.push(newMeaning);
    setCard(newCard);
  };

  const updateWord = (updatedMeaning: object) => {
    let newCard = { ...card };
    let meaningId = newCard.meanings.findIndex(
      (m) =>
        (m.id === updatedMeaning.id && m.id !== 0) ||
        m.tempId === updatedMeaning.tempId
    );
    if (meaningId === -1) return;
    newCard.meanings[meaningId] = updatedMeaning;
    setCard(newCard);
  };

  const deleteMeaning = (toDeleteMeaning: object) => {
    let newCard = { ...card };

    let newMeanings = [...newCard.meanings];
    let foundIndex =
      toDeleteMeaning.id === 0
        ? newMeanings.findIndex((m) => m.tempId === toDeleteMeaning.tempId)
        : newMeanings.findIndex((m) => m.id === toDeleteMeaning.id);

    if (foundIndex === -1) return;

    newMeanings.splice(foundIndex, 1);
    newCard.meanings = newMeanings;

    setCard(newCard);

    if (toDeleteMeaning.id && toDeleteMeaning.id > 0) {
      let newDelet = [...deletedIds];
      newDelet.push(toDeleteMeaning.id);
      setDeletedIds(newDelet);
    }
  };

  useEffect(() => {
    getTags();
    getDifficulties();
    getFrequencies();
    getRegisters();
    getWordTypes();
    getWord();
  }, []);

  return (
    <div
      className="edit-flashcard"
    >
      {isObjectEmpty(card) ? (
        <>Cannot find this word</>
      ) : (
        <>
          <h2>Definitions</h2>
          <h5>
            <a
              href={`https://translate.google.ca/?sl=fr&tl=en&text=${word}&op=translate`}
              target="_blank"
            >
              Google Translate
            </a>
          </h5>
          <h5>
            <a
              href={`https://www.wordreference.com/fren/${word}`}
              target="_blank"
            >
              Word Reference
            </a>
          </h5>
          {card?.wordId && (
            <FloatButton.Group
              open={openFloatButton}
              onClick={() => setOpenFloatButton(!openFloatButton)}
              trigger="click"
              style={{ insetInlineEnd: 24 }}
              type={openFloatButton ? "default" : "primary"}
            >
              <FloatButton
                type="primary"
                onClick={() => addMeaning()}
                icon={<PlusOutlined />}
                tooltip="Add Meaning"
              />
              <FloatButton
                type="primary"
                onClick={() => saveChanges()}
                icon={<SaveOutlined />}
                tooltip="Save Changes"
              />
            </FloatButton.Group>
          )}

          <CustomizedAlert text={"Saved"} open={open} setOpen={setOpen} />

          <form>
            {card?.meanings?.map((def, index) => (
              <DefinitionInputs
                key={def.id ? def.id : def.tempId}
                meaningObj={def}
                registers={registers}
                difficulties={difficulties}
                frequencies={frequencies}
                wordTypes={wordTypes}
                tags={tags}
                order={index + 1}
                updateWord={(updatedMeaning) => updateWord(updatedMeaning)}
                deleteMeaning={(toDeleteMeaning, meaningIndex) =>
                  deleteMeaning(toDeleteMeaning, meaningIndex)
                }
                style={{ margin: "50px" }}
                defaultOpen={def.id === 0}
              />
            ))}
          </form>
        </>
      )}
    </div>
  );
};
