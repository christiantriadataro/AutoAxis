import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AutotipsTable } from 'src/sections/autotips/autotips-table';
import { AutotipsSearch } from 'src/sections/autotips/autotips-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

const data = [
  {
    id: '5e86809283e28b96d2d38537',
    tip_id: "R20231002-1145",
    title: "How to fix steering wheel",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    marketing: "Luis Lucero",
    created_at: new Date(2023, 6, 2),
    updated_at: new Date(2023, 6, 2),
    avatar: '/assets/avatars/avatar-mark-galvez.png',
  },
  {
    id: '5e887ac47eed253091be10cb',
    tip_id: "R20231002-1025",
    title: "How to fix steering wheel",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    marketing: "Mark Galvez",
    created_at: new Date(2023, 6, 2),
    updated_at: new Date(2023, 6, 2),
    avatar: '/assets/avatars/avatar-luis-lucero.png',
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    tip_id: "R20231002-0645",
    title: "How to fix steering wheel",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    marketing: "Andrei Nicholas",
    created_at: new Date(2023, 6, 2),
    updated_at: new Date(2023, 6, 2),
    avatar: '/assets/avatars/avatar-andrei-nicholas.png',
  },

];

const useAutotips = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useAutotipsIds = (autotips) => {
  return useMemo(
    () => {
      return autotips.map((autotips) => autotips.id);
    },
    [autotips]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const autotips = useAutotips(page, rowsPerPage);
  const autotipsIds = useAutotipsIds(autotips);
  const autotipsSelection = useSelection(autotipsIds);

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
          Auto Tips | AutoAxis
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
                  Auto Tips
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
            <AutotipsSearch />
            <AutotipsTable
              count={data.length}
              items={autotips}
              onDeselectAll={autotipsSelection.handleDeselectAll}
              onDeselectOne={autotipsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={autotipsSelection.handleSelectAll}
              onSelectOne={autotipsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={autotipsSelection.selected}
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
