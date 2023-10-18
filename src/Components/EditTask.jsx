import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export function EditTask({ open, title, id, status, desc, onClose, onSave }) {
  const [editedTask, setEditedTask] = useState({
    title: title,
    desc: desc,
  });

  useEffect(() => {
    setEditedTask({
      title: title,
      desc: desc,
      status: status,
    });
  }, [title, desc]);

  const handleSave = () => {
    // console.log(editedTask);
    onSave(id, editedTask);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit the task details:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          name="title"
          value={editedTask.title}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          name="desc"
          value={editedTask.desc}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
