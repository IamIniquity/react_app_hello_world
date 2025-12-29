import React, { useMemo, useState } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  flexRender 
} from '@tanstack/react-table';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Chip, 
  Rating, 
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import { 
  useGetFeedbackQuery,
  useDeleteFeedbackMutation,
  useUpdateFeedbackStatusMutation 
} from "../../redux/api/rtkApi";

const FeedbackTable = () => {
  const [sorting, setSorting] = useState([]);
  
  // RTK Query
  const { 
    data: feedback = [], 
    isLoading, 
    isError, 
    error 
  } = useGetFeedbackQuery();
  
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const [updateFeedbackStatus] = useUpdateFeedbackStatusMutation();

  const handleDelete = async (id, name) => {
    if (window.confirm(`Удалить отзыв от "${name}"?`)) {
      try {
        await deleteFeedback(id).unwrap();
      } catch (err) {
        console.error('Ошибка удаления:', err);
      }
    }
  };

  const handleStatusChange = async (id, newStatus, currentStatus) => {
    const statusMessages = {
      approved: 'одобрить',
      rejected: 'отклонить',
      pending: 'вернуть на рассмотрение'
    };
    
    if (window.confirm(`Вы уверены, что хотите ${statusMessages[newStatus]} этот отзыв?`)) {
      try {
        await updateFeedbackStatus({ id, status: newStatus }).unwrap();
      } catch (err) {
        console.error('Ошибка изменения статуса:', err);
      }
    }
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
    { accessorKey: 'date', header: 'Дата' },
    {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => {
        const feedbackItem = row.original;
        return (
          <>
            <IconButton size="small" onClick={() => handleDelete(feedbackItem.id, feedbackItem.name)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
            {feedbackItem.status !== 'approved' && (
              <IconButton size="small" onClick={() => handleStatusChange(feedbackItem.id, 'approved', feedbackItem.status)}>
                <CheckCircleIcon fontSize="small" color="success" />
              </IconButton>
            )}
            {feedbackItem.status !== 'rejected' && (
              <IconButton size="small" onClick={() => handleStatusChange(feedbackItem.id, 'rejected', feedbackItem.status)}>
                <CancelIcon fontSize="small" color="error" />
              </IconButton>
            )}
            {feedbackItem.status !== 'pending' && (
              <IconButton size="small" onClick={() => handleStatusChange(feedbackItem.id, 'pending', feedbackItem.status)}>
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

  // Состояния загрузки
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Ошибка загрузки отзывов: {error?.data?.message || error?.message}
      </Alert>
    );
  }

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