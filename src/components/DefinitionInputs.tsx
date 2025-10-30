import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Rating,
  Select,
  TextField,
} from "@mui/material";
import "../style.css";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Select as AntSelect, type SelectProps } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface DefinitionInputsProps {
  meaningObj: object;
  registers: Level[];
  frequencies: Level[];
  difficulties: Level[];
  wordTypes: object[];
  tags: object[];
  order: number;
  updateWord: (word: object) => void;
  deleteMeaning: (meaning: object, meaningIndex: number) => void;
  style?: object;
  defaultOpen?: boolean;
}

interface Level {
  level: number;
  label: string;
}

const RenderType = {
  NONE: "",
  DEFINITION: "definition",
  NOTE: "note",
  DIFFICULTY: "difficulty",
  FREQUENCY: "frequency",
  REGISTER: "register",
  TAGS: "tags",
  WORD_TYPE: "wordType",
  EXAMPLES: "example",
  DELETE_CONFIRMATION: "delete",
};

const iconStyle = { height: "30px", cursor: "pointer" };

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const DefinitionInputs: React.FC<DefinitionInputsProps> = ({
  registers,
  frequencies,
  difficulties,
  wordTypes,
  tags,
  meaningObj,
  order,
  updateWord,
  deleteMeaning,
  style,
  defaultOpen = false,
}) => {
  const [meaning, setMeaning] = useState(meaningObj);
  const [open, setOpen] = useState(defaultOpen);
  const [selectedInput, setSeletedInput] = useState("");
  const [selectedMeaning, setSelectedMeaning] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setSeletedInput("");
    setSelectedMeaning({});
    setOpenModal(false);
  };

  const options: SelectProps["options"] = tags.map((tag) => ({
    label: tag.name,
    value: tag.name,
  }));

  const handleTextFieldChange = (event, propName) => {
    console.log(meaning);
    let newMeaning = { ...meaning };
    newMeaning[propName] = event.target.value;
    setMeaning(newMeaning);
    setSelectedMeaning(newMeaning);
    updateWord(newMeaning);
  };

  const handleTagsChange = (values: string[]) => {
    let newMeaning = { ...meaning };
    newMeaning.tags = values;
    setMeaning(newMeaning);
    setSelectedMeaning(newMeaning);
    updateWord(newMeaning);

    // TODO: update tags in original source too
  };

  const handleExampleChange = (event, index) => {
    let newMeaning = { ...meaning };
    newMeaning.examples[index].content = event.target.value;
    setMeaning(newMeaning);
    updateWord(newMeaning);
  };

  const addExample = () => {
    let newMeaning = { ...meaning };
    newMeaning.examples.push({ id: 0, content: "" });
    setMeaning(newMeaning);
    updateWord(newMeaning);
  };

  const deleteExample = (index) => {
    let newMeaning = { ...meaning };
    newMeaning.examples.splice(index, 1);
    setMeaning(newMeaning);
    updateWord(newMeaning);
  };

  const renderDefinitionInput = (meaning: object) => {
    return (
      <>
        <label className="label">Definition:</label>
        <TextField
          value={meaning.description}
          onChange={(e) => handleTextFieldChange(e, "description")}
          className="input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClose();
            }
          }}
        />
      </>
    );
  };

  const renderNoteInput = (meaning: object) => {
    return (
      <>
        <label className="label">Note:</label>
        <TextField
          value={meaning.note}
          onChange={(e) => handleTextFieldChange(e, "note")}
          className="input"
        />
      </>
    );
  };

  const renderDifficultyInput = (meaning: object) => {
    return (
      <>
        <label className="label">Difficulty:</label>
        <Select
          value={meaning.difficulty}
          onChange={(e) => handleTextFieldChange(e, RenderType.DIFFICULTY)}
          className="input"
        >
          {difficulties.map((difficulty) => {
            return (
              <MenuItem
                key={difficulty.level + "_diff"}
                value={difficulty.level}
              >
                {difficulty.label}
              </MenuItem>
            );
          })}
        </Select>
      </>
    );
  };

  const renderFrequencyInput = (meaning: object) => {
    return (
      <>
        <label className="label">Frequency:</label>
        <Select
          value={meaning.frequency}
          onChange={(e) => handleTextFieldChange(e, RenderType.FREQUENCY)}
          className="input"
        >
          {frequencies.map((frequency) => {
            return (
              <MenuItem key={frequency.level + "_freq"} value={frequency.level}>
                {frequency.label}
              </MenuItem>
            );
          })}
        </Select>
      </>
    );
  };

  const renderRegisterInput = (meaning: object) => {
    return (
      <>
        <label className="label">Register:</label>
        <Select
          value={meaning.register}
          onChange={(e) => handleTextFieldChange(e, "register")}
          className="input"
        >
          {registers.map((register) => {
            return (
              <MenuItem key={register.level + "_reg"} value={register.level}>
                {register.label}
              </MenuItem>
            );
          })}
        </Select>
      </>
    );
  };

  const renderWordTypeInput = (meaning: object) => {
    return (
      <>
        <label className="label">Word Type:</label>
        <Select
          value={meaning.wordType}
          onChange={(e) => handleTextFieldChange(e, RenderType.WORD_TYPE)}
          className="input"
        >
          {wordTypes.map((wordType) => {
            return (
              <MenuItem key={wordType.code} value={wordType.type}>
                {wordType.type}
              </MenuItem>
            );
          })}
        </Select>
      </>
    );
  };

  const renderExamplesInput = (meaning: object) => {
    return (
      <>
        <div className="add-icon">
          <AddIcon
            onClick={() => addExample()}
            className="cursor-pointer"
            style={{ color: "green" }}
          />
        </div>

        {meaning.examples.map((ex, exIndex) => {
          return (
            <div key={exIndex + "_example"} className="row">
              <div
                className="flex-container-row"
                style={{ marginBottom: "10px" }}
              >
                <label>Example {exIndex + 1}:</label>
                <div>
                  <Button
                    className="input-item"
                    variant="outlined"
                    onClick={() => deleteExample(exIndex)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </div>

              <TextField
                value={ex.content}
                onChange={(e) => handleExampleChange(e, exIndex)}
                multiline
                minRows={2}
                fullWidth
              />

              {/* </div> */}
            </div>
          );
        })}
      </>
    );
  };

  const renderTagInput = (meaning: object) => {
    return (
      <>
        <label className="label">Tags:</label>
        <AntSelect
          mode="tags"
          placeholder="Tags Mode"
          onChange={handleTagsChange}
          options={options}
          value={meaning.tags}
          className="input"
        />
      </>
    );
  };

  const renderInput = (inputType: string, meaning: object) => {
    switch (inputType) {
      case RenderType.DEFINITION:
        return renderDefinitionInput(meaning);
      case RenderType.WORD_TYPE:
        return renderWordTypeInput(meaning);
      case RenderType.NOTE:
        return renderNoteInput(meaning);
      case RenderType.DIFFICULTY:
        return renderDifficultyInput(meaning);
      case RenderType.FREQUENCY:
        return renderFrequencyInput(meaning);
      case RenderType.REGISTER:
        return renderRegisterInput(meaning);
      case RenderType.TAGS:
        return renderTagInput(meaning);
      case RenderType.EXAMPLES:
        return renderExamplesInput(meaning);
      case RenderType.DELETE_CONFIRMATION:
        return renderDeleteConfirmation(meaning);
      case RenderType.NONE:
        return <></>;
    }
  };

  const renderEditInput = (inputType: string) => {
    return (
      <div className="edit-icon flex-button">
        <ModeEditIcon
          className="icon"
          style={{ ...iconStyle, color: "blue" }}
          onClick={() => openModalForInput(inputType, meaning)}
        />
      </div>
    );
  };

  const renderDeleteConfirmation = (meaning: object) => {
    return (
      <>
        <div>Are you sure to delete this meaning?</div>
        <Button onClick={() => deleteMeaning(meaning, order - 1)}>Yes</Button>
        <Button onClick={handleClose}>No</Button>
      </>
    );
  };

  const openModalForInput = (name: string, meaning: object) => {
    setSeletedInput(name);
    setSelectedMeaning(meaning);
    setOpenModal(true);
  };

  const renderExpandCollapseIcon = () => {
    return (
      <div className="flex-container-row">
        <div
          title="Collapse"
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
        >
          {!open ? (
            <KeyboardDoubleArrowDownIcon
              style={{ height: "15px" }}
              className="cursor-pointer"
            />
          ) : (
            <KeyboardDoubleArrowUpIcon style={{ height: "15px" }} />
          )}

          <label style={{ fontWeight: open ? "bold" : "" }}>
            Definition {order}: <strong>{meaning.description}</strong>
          </label>

          {!open ? (
            <KeyboardDoubleArrowDownIcon
              style={{ height: "15px" }}
              className="cursor-pointer"
            />
          ) : (
            <KeyboardDoubleArrowUpIcon style={{ height: "15px" }} />
          )}
        </div>

        {renderEditInput(RenderType.DEFINITION)}

        <div className="delete-icon">
          <DeleteIcon
            onClick={() =>
              openModalForInput(RenderType.DELETE_CONFIRMATION, meaning)
            }
            className="cursor-pointer "
            style={{ color: "red" }}
          />
        </div>
      </div>
    );
  };

  const chosenDifficulty = difficulties.find(
    (r) => r.level == meaning.difficulty
  );
  const chosenFrequency = frequencies.find((r) => r.level == meaning.frequency);
  const chosenRegister = registers.find((r) => r.level == meaning.register);

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 0:
        return "red";
      case 1:
      case 2:
        return "green";
      case 3:
      case 4:
        return "purple";
    }
  };

  const getFrequencyColor = (level: number) => {
    switch (level) {
      case 0:
        return "red";
      case 1:
      case 2:
        return "green";
      case 3:
      case 4:
        return "purple";
    }
  };

  const getRegisterColor = (level: number) => {
    switch (level) {
      case 0:
      case 4:
        return "red";
      case 1:
      case 2:
        return "green";
      case 3:
        return "purple";
    }
  };

  return (
    <div style={style}>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {" "}
          {renderInput(selectedInput, selectedMeaning)}
        </Box>
      </Modal>

      {renderExpandCollapseIcon()}

      {open && (
        <>
          <div className="flex-container-row">
            <label className="label flex-text">
              Word Type: <strong>{meaning.wordType}</strong>
            </label>
            {renderEditInput(RenderType.WORD_TYPE)}
          </div>

          <div className="flex-container-row">
            <label className="label flex-text">
              Note:{" "}
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {meaning.note}
              </span>
            </label>
            {renderEditInput(RenderType.NOTE)}
          </div>

          <div className="flex-container-row">
            <label className="label flex-text">Examples:</label>

            <div className="flex-button">
              {renderEditInput(RenderType.EXAMPLES)}
            </div>
          </div>

          <div>
            {meaning.examples.map((e, i) => {
              return (
                <div key={i + "_ex"}>
                  Example {i + 1}: {e.content}
                </div>
              );
            })}
          </div>

          <div className="flex-container-row">
            <label className="label flex-text">
              Difficulty: <strong>{chosenDifficulty?.label}</strong>
              <Rating
                name="simple-controlled"
                value={chosenDifficulty?.level + 1}
                max={registers.length}
                style={{ color: getDifficultyColor(chosenDifficulty?.level) }}
              />
            </label>
            {renderEditInput(RenderType.DIFFICULTY)}
          </div>

          <div className="flex-container-row">
            <label className="label flex-text">
              Frequency: <strong> {chosenFrequency?.label}</strong>
              <Rating
                name="simple-controlled"
                value={chosenFrequency?.level + 1}
                max={registers.length}
                style={{ color: getFrequencyColor(chosenFrequency?.level) }}
              />
            </label>
            {renderEditInput(RenderType.FREQUENCY)}
          </div>

          <div className="flex-container-row">
            <label className="label flex-text">
              Register: <strong>{chosenRegister?.label}</strong>
              <Rating
                name="simple-controlled"
                value={chosenRegister?.level + 1}
                max={registers.length}
                style={{ color: getRegisterColor(chosenRegister?.level) }}
              />
            </label>
            {renderEditInput(RenderType.REGISTER)}
          </div>

          <div className="flex-container-row">
            <label className="label">Tags:</label>
            {/* {renderEditInput(InputType.TAGS)} */}
            <AntSelect
              mode="tags"
              placeholder="Tags Mode"
              onChange={handleTagsChange}
              options={options}
              value={meaning.tags}
              className="input"
            />
          </div>
        </>
      )}
    </div>
  );
};
