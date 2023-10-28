import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { ITableData } from '@/mock/TABLE_DATA';
import { IColumn } from '@/types/dockQueue';

type IDataTableProps = {
  data?: ITableData;
  columns: IColumn[];
  addButtonConfig?: {
    onClick: () => void;
    label: string;
  };
};

const StyledPaper = styled(Paper)`
  padding: 10px;
  margin: 10px;
  position: relative;
`;
const StyledButton = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
  td {
    text-wrap: nowrap;
  }
  th {
    height: 82px;
    max-height: 82px;
  }
`;
const PinnedTableContainer = styled(TableContainer)`
  overflow: initial;
  order: 0;
  flex: 0 1 auto;
  align-self: stretch;
  position: relative;
  width: initial;
  .MuiTableRow-root {
    height: 60px;
  }
`;
const ScrollingTableContainer = styled(TableContainer)`
  order: 1;
  flex: 1 1 auto;
  align-self: stretch;
  position: relative;
  width: initial;
  .MuiTableRow-root {
    height: 60px;
  }
`;

const DataTable = ({ data, columns, addButtonConfig }: IDataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <StyledPaper>
      <Wrapper>
        <PinnedTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns
                  .filter(x => x.pinned)
                  .map(column => (
                    <TableCell key={`header-${column.field}`}>{column.headerName}</TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.list.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableRow key={`row-${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {columns
                    .filter(x => x.pinned)
                    .map(column => {
                      const cell = column.formatter ? column.formatter({ value: row[column.field], row }) : '';
                      // eslint-disable-next-line react/no-array-index-key
                      return <TableCell key={`cell-${index}-${column.field}`}>{cell}</TableCell>;
                    })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PinnedTableContainer>
        <ScrollingTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns
                  .filter(x => !x.pinned)
                  .map(column => (
                    <TableCell key={`header-${column.field}`}>{column.headerName}</TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.list.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableRow key={`row-${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {columns
                    .filter(x => !x.pinned)
                    .map(column => {
                      const cell = column.formatter ? column.formatter({ value: row[column.field], row }) : '';
                      // eslint-disable-next-line react/no-array-index-key
                      return <TableCell key={`cell-${index}-${column.field}`}>{cell}</TableCell>;
                    })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollingTableContainer>
      </Wrapper>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data?.totalSize || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ width: 'fit-content', overflow: 'hidden' }}
      />
      {addButtonConfig?.label && (
        <StyledButton onClick={addButtonConfig?.onClick} variant='contained'>
          {addButtonConfig?.label}
        </StyledButton>
      )}
    </StyledPaper>
  );
};

export default DataTable;
