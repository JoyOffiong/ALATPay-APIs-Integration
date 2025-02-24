"use client"

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface T {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface H {
  label: string;
}



export default function TableComponent() {

    const [rows, setRows] = useState<Array<T>>([]);
  
  const Tableheadings=[
  {label:"S/N"}, {label:"First Name"}, {label:"Last Name"}, {label:"Email"}]

    useEffect(() => {
      const row = JSON.parse(localStorage.getItem("customer")) || [];
      setRows(row);
    }, []);

  
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
            const { id, firstName, lastName, email } = row;
            return (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right" size={"small"}>
                  {index + 1}
                </TableCell>
                <TableCell align="right">{firstName}</TableCell>
                <TableCell align="right">{lastName}</TableCell>
                <TableCell align="right">{email}</TableCell>
                <TableCell
                  align="right"
                  className="flex justify-end gap-2 items-center flex-row"
                >
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
