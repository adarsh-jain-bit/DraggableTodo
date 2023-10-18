import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/material";
import { EditTask } from "./EditTask";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function BasicCard({
  title,
  desc,
  status,
  handleDelete,
  id,
  onEdit,
}) {
  const [editOpen, setEditOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };
  return (
    <Card sx={{ maxWidth: 275, minWidth: 150 }} key={id}>
      <CardContent>
        <Typography variant="h5" textAlign="center">
          {title}
        </Typography>

        <Typography variant="body2" textAlign="center">
          {desc}
        </Typography>
        <Stack
          gap={2}
          direction="row"
          mt={3}
          justifyContent={matches ? "space-between" : "center"}
          flexWrap="wrap"
        >
          <Button
            variant="outlined"
            size="small"
            sx={{ color: "#1565C0", borderColor: "#1565C0" }}
            endIcon={<EditIcon />}
            onClick={handleEditOpen}
          >
            Edit
          </Button>
          <EditTask
            open={editOpen}
            title={title}
            id={id}
            desc={desc}
            status={status}
            onClose={handleEditClose}
            onSave={onEdit}
          />
          <Button
            variant="outlined"
            size="small"
            sx={{ color: "red", borderColor: "red" }}
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(id, status)}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
