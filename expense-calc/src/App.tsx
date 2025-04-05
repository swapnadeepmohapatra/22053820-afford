import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Stack,
  Typography,
} from "@mui/material";

function App() {
  const [text, setText] = useState<number>(0);
  const [expenses, setExpenses] = useState<number[]>([]);
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    addExpense(text);
  }

  function onModalSubmit(e: FormEvent) {
    e.preventDefault();

    if (editingItem !== null) {
      update(editingItem, text);
      setIsModalOpen(false);
      setText(0);
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setText(parseInt(e.target.value));
  }

  function addExpense(amount: number) {
    setExpenses((s) => [...s, amount]);
    setText(0);
  }

  const onDelete = (index: number) => () => {
    setExpenses((s) => [...s.slice(0, index), ...s.slice(index + 1)]);
  };

  function onEdit(index: number) {
    return function () {
      setEditingItem(index);
      setIsModalOpen(true);
    };
  }

  function update(index: number, amount: number) {
    setExpenses((s) => [...s.slice(0, index), amount, ...s.slice(index + 1)]);
  }

  return (
    <Container>
      <Typography variant={"h2"} component={"h1"}>
        Expense Tracker
      </Typography>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "1rem 0",
        }}
      >
        <FormControl>
          <FormLabel
            sx={{
              color: "white",
            }}
          >
            Amount
          </FormLabel>
          <Input
            type="number"
            sx={{
              color: "white",
            }}
            value={text}
            onChange={onChange}
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{
            marginTop: "1rem",
          }}
          type="submit"
        >
          Add Expense
        </Button>
      </form>
      {expenses.length === 0 && <Typography>No Expnses So Far!</Typography>}
      <Stack gap={2}>
        {expenses.map((expnse, index) => (
          <Card key={index}>
            <CardContent>{expnse}</CardContent>
            <Button
              sx={{
                padding: "1rem",
              }}
              onClick={onEdit(index)}
            >
              Update
            </Button>
            <Button
              sx={{
                padding: "1rem",
              }}
              onClick={onDelete(index)}
            >
              Delete
            </Button>
          </Card>
        ))}
      </Stack>
      <Modal open={isModalOpen}>
        <Stack
          sx={{
            background: "white",
          }}
        >
          <form
            onSubmit={onModalSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              margin: "1rem 0",
            }}
          >
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input type="number" value={text} onChange={onChange} />
            </FormControl>
            <Button
              variant="contained"
              sx={{
                marginTop: "1rem",
              }}
              type="submit"
            >
              Save
            </Button>
          </form>
          <Button
            variant="contained"
            sx={{
              marginTop: "1rem",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
}

export default App;
