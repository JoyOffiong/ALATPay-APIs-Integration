import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Edit, Trash } from "lucide-react";

interface T {
  id: string;
  task: string;
  time: string;
  status: string;
}

interface H {
  label: string;
}

interface TaskTabProps {
  rows: Array<T> | undefined;
  deleteItem: (id: string) => void;
  setRefetch: (value: boolean) => void;
  fetchItemById: (id: string) => void;
  Tableheadings: Array<H>;
}

export default function TableComponent({
  rows,
  deleteItem,
  fetchItemById,
  Tableheadings,
}: TaskTabProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Tableheadings.map((heading) => {
              return (
                <>
                  <TableCell align="right">{heading.label}</TableCell>
                </>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => {
            const { id, task, time, status } = row;
            return (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right" size={"small"}>
                  {index + 1}
                </TableCell>
                <TableCell align="right">{task}</TableCell>
                <TableCell align="right">{time}</TableCell>
                <TableCell align="right">{status}</TableCell>
                <TableCell
                  align="right"
                  className="flex justify-end gap-2 items-center flex-row"
                >
                  <Trash onClick={() => deleteItem(id)} />
                  <Edit onClick={() => fetchItemById(id)} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
