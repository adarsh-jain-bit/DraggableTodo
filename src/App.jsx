import React, { useEffect, useState } from "react";
import { Container, TextField, Typography, Stack, Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BasicCard from "./Components/Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
function App() {
  const [data, setData] = useState({
    title: "",
    desc: "",
    status: "",
  });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [todo, setTodo] = useState({
    todo: [],
    doing: [],
    done: [],
  });
  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value, id: uuidv4() }));
  };
  const handleSubmitData = () => {
    setData({ desc: "", title: "", status: "" });

    if (data.status === "todo") {
      setTodo((prevTodo) => ({
        ...prevTodo,
        todo: [...prevTodo.todo, data],
      }));
    } else if (data.status === "doing") {
      setTodo((prevTodo) => ({
        ...prevTodo,
        doing: [...prevTodo.doing, data],
      }));
    } else if (data.status === "done") {
      setTodo((prevTodo) => ({
        ...prevTodo,
        done: [...prevTodo.done, data],
      }));
    }
  };
  const handleDelete = (id, status) => {
    let a = todo[status].filter((task) => task.id !== id);
    console.log(a);
    setTodo((prevTodo) => ({
      ...prevTodo,
      [status]: a,
    }));
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return; // Task was dropped outside a droppable area, do nothing.
    }

    if (source.droppableId === destination.droppableId) {
      // Task moved within the same list
      const status = source.droppableId;
      const updatedTasks = [...todo[status]];
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      setTodo((prevTodo) => ({
        ...prevTodo,
        [status]: updatedTasks,
      }));
    } else {
      // Task moved to a different list
      const sourceStatus = source.droppableId;
      const destinationStatus = destination.droppableId;
      const movedTask = todo[sourceStatus][source.index];

      setTodo((prevTodo) => ({
        ...prevTodo,
        [sourceStatus]: prevTodo[sourceStatus].filter(
          (_, index) => index !== source.index
        ),
        [destinationStatus]: [
          ...prevTodo[destinationStatus].slice(0, destination.index),
          movedTask,
          ...prevTodo[destinationStatus].slice(destination.index),
        ],
      }));
    }
  };
  const handleEditTask = (id, editedTask) => {
    // console.log(id, editedTask.status);
    const updatedTodo = todo[editedTask.status].map((task) => {
      if (task.id === id) {
        return { ...task, ...editedTask };
      }
      return task;
    });

    setTodo((prevTodo) => ({
      ...prevTodo,
      [editedTask.status]: updatedTodo,
    }));
  };

  return (
    <>
      <Container>
        <Typography variant="h3" textAlign="center">
          Todo List
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch", height: "50px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="title"
            variant="outlined"
            value={data.title}
            name="title"
            onChange={handleData}
          />
          <TextField
            id="outlined-basic"
            label="description"
            variant="outlined"
            name="desc"
            value={data.desc}
            onChange={handleData}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              name="status"
              value={data.status}
              onChange={handleData}
            >
              <MenuItem value={"todo"}>Todo</MenuItem>
              <MenuItem value={"doing"}>Doing</MenuItem>
              <MenuItem value={"done"}>Done</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            size="large"
            onClick={handleSubmitData}
          >
            Add Task
          </Button>
        </Box>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Box
            display="flex"
            justifyContent="center"
            gap={3}
            mt={3}
            flexWrap="wrap"
          >
            <Box
              sx={{
                background: "gray",
                p: "10px",
                maxWidth: 250,
                minWidth: 150,
                height: "fit-content",
              }}
            >
              <Droppable droppableId="todo">
                {(provided) => (
                  <Stack
                    gap={2}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Typography textAlign="center" variant="h5">
                      Todo Task
                    </Typography>
                    {todo.todo.map(({ title, desc, status, id }, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <BasicCard
                                title={title}
                                desc={desc}
                                status={status}
                                handleDelete={handleDelete}
                                id={id}
                                onEdit={handleEditTask}
                              />
                            </Box>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </Box>
            <Box
              sx={{
                background: "gray",
                p: "10px",
                maxWidth: 250,
                minWidth: 150,
                height: "fit-content",
              }}
            >
              <Droppable droppableId="doing">
                {(provided) => (
                  <Stack
                    gap={2}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Typography textAlign="center" variant="h5">
                      Doing Task
                    </Typography>
                    {todo.doing.map(({ title, desc, status, id }, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <BasicCard
                                title={title}
                                desc={desc}
                                status={status}
                                handleDelete={handleDelete}
                                id={id}
                                onEdit={handleEditTask}
                              />
                            </Box>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </Box>
            <Box
              sx={{
                background: "gray",
                p: "10px",
                maxWidth: 250,
                minWidth: 150,
                height: "fit-content",
              }}
            >
              <Droppable droppableId="done">
                {(provided) => (
                  <Stack
                    gap={2}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Typography textAlign="center" variant="h5">
                      Done Task
                    </Typography>
                    {todo.done.map(({ title, desc, status, id }, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <BasicCard
                                title={title}
                                desc={desc}
                                status={status}
                                handleDelete={handleDelete}
                                id={id}
                                onEdit={handleEditTask}
                              />
                            </Box>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </Box>
          </Box>
        </DragDropContext>
      </Container>
    </>
  );
}

export default App;
