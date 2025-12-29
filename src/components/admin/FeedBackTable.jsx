import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Rating } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import { fetchFeedback, removeFeedback, updateFeedbackStatus } from '../../redux/slices/apiSlice';

const FeedbackTable = () => {
  const dispatch = useDispatch();
  const { feedback } = useSelector((state) => state.api);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Удалить отзыв?')) {
      dispatch(removeFeedback(id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateFeedbackStatus({ id, status: newStatus }));
  };

  const columns = useMemo(() => [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Имя' },
    { accessorKey: 'email', header: 'Email' },
    { 
      accessorKey: 'message', 
      header: 'Сообщение',
      cell: ({ getValue }) => (
        <div style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {getValue()}
        </div>
      )
    },
    { 
      accessorKey: 'rating', 
      header: 'Оценка',
      cell: ({ getValue }) => <Rating value={getValue()} readOnly size="small" />
    },
    { 
      accessorKey: 'status', 
      header: 'Статус',
      cell: ({ getValue }) => {
        const statusConfig = {
          approved: { label: 'Одобрен', color: 'success', icon: <CheckCircleIcon /> },
          pending: { label: 'Ожидает', color: 'warning', icon: <PendingIcon /> },
          rejected: { label: 'Отклонен', color: 'error', icon: <CancelIcon /> },
        };
        const config = statusConfig[getValue()] || statusConfig.pending;
        return <Chip label={config.label} color={config.color} size="small" />;
      }
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => {
        const item = row.original;
        return (
          <>
            <IconButton size="small" onClick={() => handleDelete(item.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
            {item.status !== 'approved' && (
              <IconButton size="small" onClick={() => handleStatusChange(item.id, 'approved')}>
                <CheckCircleIcon fontSize="small" color="success" />
              </IconButton>
            )}
            {item.status !== 'rejected' && (
              <IconButton size="small" onClick={() => handleStatusChange(item.id, 'rejected')}>
                <CancelIcon fontSize="small" color="error" />
              </IconButton>
            )}
            {item.status !== 'pending' && (
              <IconButton size="small" onClick={() => handleStatusChange(item.id, 'pending')}>
                <PendingIcon fontSize="small" color="warning" />
              </IconButton>
            )}
          </>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data: feedback || [],
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

export default FeedbackTable;