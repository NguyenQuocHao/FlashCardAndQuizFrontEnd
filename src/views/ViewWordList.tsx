import { useEffect, useMemo, useState } from "react";
import "../style.css";
import { createApi, fetchApi } from "../utils/http";
import WordListItem from "../components/WordListItem";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { CustomizedAlert } from "../components/CustomizedAlert";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { cardTypes, cardTypesArray } from "../components/WordListItem";

interface Level {
  level: number;
  label: string;
}

const sortOptions = {
  alphabetical: "alphabetical",
  reverseAlphabetical: "reverse alphabetical",
  mostRecent: "most recent",
  oldest: "oldest",
  random: "random",
};

const sortOptionsArray = Object.keys(sortOptions).map((key) => ({
  value: key,
  label: sortOptions[key],
}));

const style = {
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

export const ViewWordList = () => {
  const [list, setList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [wordInput, setWordInput] = useState("");

  const [sortBy, setSortBy] = useState(sortOptions.random);
  const [displayBy, setDisplayBy] = useState(cardTypes.cardBare);

  const filteredList = useMemo(() => {
    let sortedList = [...list];
    switch (sortBy) {
      case sortOptions.alphabetical:
        sortedList.sort((a, b) => a.wordContent.localeCompare(b.wordContent));
        break;
      case sortOptions.reverseAlphabetical:
        sortedList.sort((a, b) => b.wordContent.localeCompare(a.wordContent));
        break;
      case sortOptions.mostRecent:
        sortedList.sort((a, b) => b.createdOn - a.createdOn);
        break;
      case sortOptions.oldest:
        sortedList.sort((a, b) => a.createdOn - b.createdOn);
        break;
      case sortOptions.random:
        for (let i = sortedList.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [sortedList[i], sortedList[j]] = [sortedList[j], sortedList[i]];
        }
        break;
      default:
        break;
    }

    return sortedList;
  }, [list, sortBy]);

  const fetchAllWords = () => {
    fetchApi("https://localhost:44366/api/card/getAll").then((data) => {
      setList(
        data.map((d) => {
          return { ...d, createdOn: new Date(d.cardDate) };
        })
      );
    });
  };

  const createWord = async () => {
    const requestBody = {
      content: wordInput,
    };

    createApi("https://localhost:44366/api/card/create", requestBody)
      .then(() => {
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error creating new word:", error);
      })
      .finally(() => {
        fetchAllWords();
        handleClose();
        setWordInput("");
      });
  };

  useEffect(() => {
    fetchAllWords();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FloatButton
        type="primary"
        onClick={handleOpen}
        icon={<PlusOutlined />}
        tooltip="Add Word/Expression"
      />
      <CustomizedAlert text={"Saved"} open={showAlert} setOpen={setShowAlert} />
      <div style={{ fontStyle: "italic", margin: "20px 0" }}>
        Showing:{" "}
        <strong>
          {filteredList.length}/{list.length}
        </strong>{" "}
        words/expressions
      </div>

      <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
        <div style={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="sort-label">Sort</InputLabel>
            <Select
              labelId="sort-label"
              label="Sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              // className="input"
            >
              {sortOptionsArray.map((opt) => {
                return (
                  <MenuItem key={opt.value} value={opt.label}>
                    {opt.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div style={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="display-label">Display</InputLabel>
            <Select
              labelId="display-label"
              value={displayBy}
              onChange={(e) => setDisplayBy(e.target.value)}
              // className="input"
              label="Display"
            >
              {cardTypesArray.map((opt) => {
                return (
                  <MenuItem key={opt.value} value={opt.label}>
                    {opt.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>

      <br />
      <br />
      <div className="word-list">
        {filteredList?.map((w, index) => {
          return (
            <div key={index}>
              <WordListItem text={w.wordContent} key={index} type={displayBy} />
            </div>
          );
        })}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            value={wordInput}
            autoFocus={true}
            onChange={(e) => setWordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createWord();
              }
            }}
            fullWidth
            label="Word/Expression"
            id="fullWidth"
          />
          <Button onClick={() => createWord()}>Add</Button>
        </Box>
      </Modal>
    </div>
  );
};
