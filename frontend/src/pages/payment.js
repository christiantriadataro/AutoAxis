import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PaymentTable } from 'src/sections/payment/payment-table';
import { PaymentSearch } from 'src/sections/payment/payment-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

const data = [
  {
    id: '5e86809283e28b96d2d38537',
    request_id: "R20231002-1145",
    customer: 'Luigi Dela Cruz',
    towing_provider: 'Mark Galvez',
    avatar: '/assets/avatars/avatar-mark-galvez.png',
    vehicle: "Toyota Camry Sedan",
    email: 'markgalvez@gmail.com',
    datetime: new Date(2023, 6, 2),
    pick_up_location: 'JX98+7QC Manila, Metro Manila',
    drop_off_location: "JX99+Q59 Manila, Metro Manila",
    status: 'ongoing',
    payment_status: "paid",
  },
  {
    id: '5e887ac47eed253091be10cb',
    request_id: "R20231002-1025",
    customer: 'Luis Lucero',
    towing_provider: 'Mark Galvez',
    avatar: '/assets/avatars/avatar-luis-lucero.png',
    datetime: new Date(2023, 6, 2),
    pick_up_location: 'JX98+7QC Manila, Metro Manila',
    drop_off_location: "JX99+Q59 Manila, Metro Manila",
    status: 'completed',
    payment_status: "paid",
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    request_id: "R20231002-0645",
    customer: 'Andrei Nicholas',
    towing_provider: 'Mark Galvez',
    vehicle: 'Chevrolet Malibu Sedan',
    avatar: '/assets/avatars/avatar-andrei-nicholas.png',
    datetime: new Date(2023, 6, 2),
    pick_up_location: 'JX98+7QC Manila, Metro Manila',
    drop_off_location: "JX99+Q59 Manila, Metro Manila",
    status: 'completed',
    payment_status: "paid",
  },

];

const usePayments = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const usePaymentIds = (payment) => {
  return useMemo(
    () => {
      return payment.map((payment) => payment.id);
    },
    [payment]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const payment = usePayments(page, rowsPerPage);
  const paymentIds = usePaymentIds(payment);
  const paymentSelection = useSelection(paymentIds);

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
          Payment | AutoAxis
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
                  Payment
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
            <PaymentSearch />
            <PaymentTable
              count={data.length}
              items={payment}
              onDeselectAll={paymentSelection.handleDeselectAll}
              onDeselectOne={paymentSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={paymentSelection.handleSelectAll}
              onSelectOne={paymentSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={paymentSelection.selected}
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
