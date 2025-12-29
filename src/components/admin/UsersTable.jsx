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
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { 
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserStatusMutation 
} from '../../redux/api/rtkApi';

const UsersTable = () => {
  const [sorting, setSorting] = useState([]);
  
  // RTK Query
  const { 
    data: users = [], 
    isLoading, 
    isError, 
    error 
  } = useGetUsersQuery();
  
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleDeleteUser = async (id, username) => {
    if (window.confirm(`Вы уверены, что хотите удалить пользователя "${username}"?`)) {
      try {
        await deleteUser(id).unwrap();
      } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
      }
    }
  };

  const handleToggleBlockUser = async (id, currentStatus, username) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    const action = currentStatus === 'active' ? 'заблокировать' : 'разблокировать';
    
    if (window.confirm(`Вы уверены, что хотите ${action} пользователя "${username}"?`)) {
      try {
        await updateUserStatus({ id, status: newStatus }).unwrap();
      } catch (error) {
        console.error('Ошибка при изменении статуса пользователя:', error);
      }
    }
  };

  const columns = useMemo(() => [
    { 
      accessorKey: 'id', 
      header: 'ID', 
      size: 80,
      enableSorting: true,
    },
    { 
      accessorKey: 'username', 
      header: 'Логин',
      enableSorting: true,
    },
    { 
      accessorKey: 'email', 
      header: 'Email',
      enableSorting: true,
    },
    { 
      accessorKey: 'name', 
      header: 'Имя',
      enableSorting: true,
    },
    { 
      accessorKey: 'role', 
      header: 'Роль',
      enableSorting: true,
      cell: ({ getValue }) => (
        <Chip 
          icon={getValue() === 'admin' ? <AdminPanelSettingsIcon /> : <PersonIcon />}
          label={getValue() === 'admin' ? 'Админ' : 'Пользователь'}
          color={getValue() === 'admin' ? 'primary' : 'default'}
          size="small"
        />
      )
    },
    { 
      accessorKey: 'status', 
      header: 'Статус',
      enableSorting: true,
      cell: ({ getValue }) => (
        <Chip 
          icon={getValue() === 'active' ? <CheckCircleIcon /> : <BlockIcon />}
          label={getValue() === 'active' ? 'Активен' : 'Заблокирован'}
          color={getValue() === 'active' ? 'success' : 'error'}
          size="small"
        />
      )
    },
    { 
      accessorKey: 'createdAt', 
      header: 'Дата регистрации',
      enableSorting: true,
    },
    {
      id: 'actions',
      header: 'Действия',
      enableSorting: false,
      cell: ({ row }) => {
        const user = row.original;
        const isCurrentUserAdmin = user.role === 'admin';
        
        return (
          <>
            <IconButton 
              size="small" 
              color="error" 
              title="Удалить"
              onClick={() => handleDeleteUser(user.id, user.username)}
              disabled={isCurrentUserAdmin}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              color={user.status === 'active' ? 'warning' : 'success'}
              title={user.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
              onClick={() => handleToggleBlockUser(user.id, user.status, user.username)}
              disabled={isCurrentUserAdmin}
            >
              {user.status === 'active' ? <BlockIcon fontSize="small" /> : <LockOpenIcon fontSize="small" />}
            </IconButton>
          </>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data: users || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Ошибка при загрузке пользователей: {error?.data?.message || error?.message}
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, headerIndex) => (
                <TableCell 
                  key={header.id}
                  sx={{ 
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold',
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() && (
                    <span style={{ marginLeft: 4 }}>
                      {header.column.getIsSorted() === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id} hover>
              {row.getVisibleCells().map((cell, cellIndex) => (
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