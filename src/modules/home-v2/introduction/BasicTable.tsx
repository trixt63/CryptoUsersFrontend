import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  appsNumber: number,
  usersNumber: number,
  realUsersNumber: number,
) {
  return { name, calories: appsNumber, fat: usersNumber, carbs: realUsersNumber};
}

const rows = [
  createData('CEX', 159, 6.0, 24),
  createData('DEX', 237, 9.0, 37),
  createData('Lendings', 262, 16.0, 24),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Number of applications</TableCell>
            <TableCell align="right">Number of users</TableCell>
            <TableCell align="right">Number of real users</TableCell>
            {/*<TableCell align="right">Protein&nbsp;(g)</TableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              {/*<TableCell align="right">{row.protein}</TableCell>*/}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}