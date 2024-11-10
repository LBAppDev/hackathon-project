import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import styled from 'styled-components';

const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <StyledPaper>
      <TableContainer>
        <StyledTable stickyHeader>
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth || 150 }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow hover key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align || 'left'}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell align="center">
                    <ButtonHaver row={row} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        sx={{
          '.MuiTablePagination-root': {
            fontFamily: 'Poppins, sans-serif',
          },
          '.MuiTablePagination-selectLabel, .MuiTablePagination-input': {
            fontSize: '0.9rem',
            color: '#555',
          },
          '.MuiTablePagination-actions button': {
            color: '#007bff',
          },
        }}
      />
    </StyledPaper>
  );
};

export default TableTemplate;

// Styled Components

const StyledPaper = styled(Paper)`
  padding: 16px;
  background-color: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const StyledTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0;
  th {
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.9rem;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
  }
`;

const StyledTableCell = styled(TableCell)`
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #555;
  &:first-child {
    border-radius: 12px 0 0 12px;
  }
  &:last-child {
    border-radius: 0 12px 12px 0;
  }
`;
