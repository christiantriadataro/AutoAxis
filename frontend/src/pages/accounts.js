import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountsTable } from 'src/sections/accounts/accounts-table';
import { AccountsSearch } from 'src/sections/accounts/accounts-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

//
const data = [
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Pasig',
      country: 'Philippines',
      state: 'NCR',
      street: 'Ewan'
    },
    avatar: '/assets/avatars/avatar-mark-galvez.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'markgalvez@gmail.com',
    role: 'Marketing',
    name: 'Mark Galvez',
    phone: '099999999999'
  },
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Manila',
      country: 'Philippines',
      state: 'NCR',
      street: 'Sampaloc, Manila'
    },
    avatar: '/assets/avatars/avatar-luis-lucero.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'luislucero@gmail.com',
    role: 'Towing Provider',
    name: 'Luis Lucero',
    phone: '099999999789'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Manila',
      country: 'Philippines',
      state: 'NCR',
      street: 'Sampaloc, Manila'
    },
    avatar: '/assets/avatars/avatar-andrei-nicholas.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'andreinicholas@gmail.com',
    role: 'Customer',
    name: 'Andrei Nicholas',
    phone: '099999456789'
  },

];


// const useAccountData = () => {
//   const [data, setData] = useState([]);
//
//   useEffect(() => {
//     // Fetch data from the Django API endpoint
//     fetch('http://127.0.0.1:8000/api/accounts/')
//       .then((response) => response.json())
//       .then((responseData) => {
//         setData(responseData);
//       })
//       .catch((error) => {
//         console.log('Error:', error);
//       });
//   }, []); // Empty dependency array to fetch data only once when the component mounts
//
//   return data;
// };
//
// const data = useAccountData();

const useAccounts = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useAccountsIds = (accounts) => {
  return useMemo(
    () => {
      return accounts.map((accounts) => accounts.id);
    },
    [accounts]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const accounts = useAccounts(page, rowsPerPage);
  const accountsIds = useAccountsIds(accounts);
  const accountsSelection = useSelection(accountsIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Accounts | AutoAxis
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Accounts
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <AccountsSearch />
            <AccountsTable
              count={data.length}
              items={accounts}
              onDeselectAll={accountsSelection.handleDeselectAll}
              onDeselectOne={accountsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={accountsSelection.handleSelectAll}
              onSelectOne={accountsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={accountsSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
