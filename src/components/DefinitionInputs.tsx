import { useState } from "react";
import {
  Autocomplete,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "../style.css";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

interface DefinitionInputsProps {
  meaning: any;
  registers: Level[];
  frequencies: Level[];
  difficulties: Level[];
  tags: object;
  order: number;
}

interface Level {
  level: number;
  label: string;
}

export const DefinitionInputs = (props: DefinitionInputsProps) => {
  const [meaning, setMeaning] = useState(props.meaning);
  const registers = props.registers;
  const frequencies = props.frequencies;
  const difficulties = props.difficulties;
  const tags = props.tags;
  const order = props.order;
  const [open, setOpen] = useState(false);

  const handleLevelChange = (event, levelType, explanation) => {
    let newMeaning = { ...meaning };
    newMeaning[levelType] = event.target.value;
    setMeaning(newMeaning);
  };

  const handleExampleChange = (event, newValues, explanation) => {
    let newMeaning = { ...meaning };
    newMeaning.tags = newValues.map((e) => e.name);
    setMeaning(newMeaning);
  };

  return (
    <>
      {!open ? (
        <div
          onClick={() => setOpen(true)}
          title="Expand"
          className="cursor-pointer"
        >
          <KeyboardDoubleArrowDownIcon
            style={{ height: "15px" }}
            className="cursor-pointer"
          />
          definition {order}: {meaning.explanation}
          <KeyboardDoubleArrowDownIcon style={{ height: "15px" }} />
        </div>
      ) : (
        <div>
          <div className="row">
            <div
              title="Collapse"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            >
              <KeyboardDoubleArrowUpIcon style={{ height: "15px" }} />
              Collapse
            </div>
            <label className="label">definition {order}:</label>
            <TextField value={meaning.explanation} className="input" />
          </div>

          {meaning.examples.map((ex, exIndex) => {
            return (
              <div key={exIndex} className="row">
                <label className="label">example {exIndex + 1}:</label>
                <TextField value={ex} className="input" />
              </div>
            );
          })}

          <div className="row">
            <label className="label">difficulty:</label>
            <Select
              value={meaning.difficulty}
              onChange={(e) =>
                handleLevelChange(e, "difficulty", meaning.explanation)
              }
              className="input"
            >
              {difficulties.map((difficulty) => {
                return (
                  <MenuItem key={difficulty.level} value={difficulty.level}>
                    {difficulty.label}
                  </MenuItem>
                );
              })}
            </Select>
          </div>

          <div className="row">
            {" "}
            <label className="label">frequency:</label>
            <Select
              value={meaning.frequency}
              onChange={(e) =>
                handleLevelChange(e, "frequency", meaning.explanation)
              }
              className="input"
            >
              {frequencies.map((frequency) => {
                return (
                  <MenuItem key={frequency.level} value={frequency.level}>
                    {frequency.label}
                  </MenuItem>
                );
              })}
            </Select>
          </div>

          <div className="row">
            <label className="label">register:</label>
            <Select
              value={meaning.register}
              onChange={(e) =>
                handleLevelChange(e, "register", meaning.explanation)
              }
              className="input"
            >
              {registers.map((register) => {
                return (
                  <MenuItem key={register.level} value={register.level}>
                    {register.label}
                  </MenuItem>
                );
              })}
            </Select>
          </div>

          <div className="row">
            <label className="label">tags:</label>
            <Autocomplete
              multiple
              limitTags={3}
              id="multiple-limit-tags"
              options={tags}
              getOptionLabel={(option) => option.name}
              value={tags.filter((tag) => meaning.tags.includes(tag.name))}
              onChange={(event, newValue) => {
                handleExampleChange(event, newValue, meaning.explanation);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="limitTags"
                  placeholder="Favorites"
                />
              )}
              className="input"
            />
          </div>
        </div>
      )}
    </>
  );
};
