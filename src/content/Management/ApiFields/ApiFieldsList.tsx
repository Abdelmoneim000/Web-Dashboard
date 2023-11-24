import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';

const ApiFieldsList = ({ apiFields }) => {
  if (!apiFields || apiFields.length === 0) {
    return <div>No data available</div>;
  }

  const headers = Object.keys(apiFields[0]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>
                <strong>{header}</strong>
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiFields.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => (
                <TableCell key={header}>
                  {header === 'requestMethod' || header === 'status' || header === 'category' ? (
                    <Box
                      component="span"
                      sx={{
                        bgcolor:
                          header === 'requestMethod'
                            ? row[header] === 'GET' // color of the GET cell
                              ? '#4679fa'
                              : row[header] === 'POST' // Color of POST cell
                              ? '#04cf29'
                              : 'inherit'
                            : header === 'status'
                            ? row[header] === 'active' // Color of active & Not Active cells
                              ? '#5df078'
                              : 'red'
                            : header === 'category' // Color for the category cells
                            ? '#2f2c42'
                            : 'inherit',
                        color: 'white',
                        p: 0.3,
                        borderRadius: 3,
                        paddingLeft: 2,
                        paddingRight: 2,
                        display: 'inline-block',
                        position: 'relative',
                        '&:hover': {
                          bgcolor: header ? header == 'status' || header == 'requestMethod' ? 'gray' : '#8c7cf0' : 'inherit', // if the cell is category, make hover purple. Else make it gray. Other cells are inherent
                        },
                      }}
                    >
                      {row[header]}
                    </Box>
                  ) : (
                    row[header]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <Tooltip title={row['status'] === 'active' ? 'Disable API' : 'Enable API'}>
                  <IconButton color="primary">
                    <img
                      src={row['status'] === 'active' ? '/arrow-2.png' : '/arrow.png'}
                      alt={row['status'] === 'active' ? 'Enable API' : 'Disable API'}
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApiFieldsList;