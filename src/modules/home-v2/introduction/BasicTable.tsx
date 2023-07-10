import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useHomeContext } from 'src/modules/home-v2/context';

export default function BasicTable() {
  const { intro } = useHomeContext();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Number of applications</TableCell>
            <TableCell align="right">Number of users</TableCell>
            <TableCell align="right">Number of real users</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            Object.entries(intro).map(([key, value]) => (
               <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell align="right">{value.numberOfApplications}</TableCell>
                <TableCell align="right">{value.numberOfUsers}</TableCell>
                <TableCell align="right">{value.numberOfRealUsers}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
