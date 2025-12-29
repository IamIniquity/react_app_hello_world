import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import { fetchUsers, deleteUser, updateUserStatus } from '../../redux/slices/apiSlice';

const UsersTable = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.api);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Удалить пользователя?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleBlock = (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    dispatch(updateUserStatus({ id, status: newStatus }));
  };

  const columns = useMemo(() => [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'username', header: 'Логин' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'name', header: 'Имя' },
    { 
      accessorKey: 'role', 
      header: 'Роль',
      cell: ({ getValue }) => (
        <Chip 
          label={getValue() === 'admin' ? 'Админ' : 'Пользователь'}
          color={getValue() === 'admin' ? 'primary' : 'default'}
          size="small"
        />
      )
    },
    { 
      accessorKey: 'status', 
      header: 'Статус',
      cell: ({ getValue }) => (
        <Chip 
          label={getValue() === 'active' ? 'Активен' : 'Заблокирован'}
          color={getValue() === 'active' ? 'success' : 'error'}
          size="small"
        />
      )
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => (
        <>
          <IconButton size="small" onClick={() => handleDelete(row.original.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleBlock(row.original.id, row.original.status)}>
            <BlockIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ], []);

  const table = useReactTable({
    data: users || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell 
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() && (header.column.getIsSorted() === 'asc' ? ' ↑' : ' ↓')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;