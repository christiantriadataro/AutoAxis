import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { InventoryTable } from 'src/sections/inventory/inventory-table';
import { InventorySearch } from 'src/sections/inventory/inventory-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

const data = [
  {
    id: '5e86809283e28b96d2d38537',
    item_id: "R20231002-1145",
    image: '/assets/avatars/avatar-mark-galvez.png',
    item: 'Wrench',
    category: 'Tools',
    mechanic: "Mark Galvez",
    status: 'borrowed',
    created_at: new Date(2023, 6, 2),
    updated_at: new Date(2023, 6, 2),

  },
  {
    id: '5e887ac47eed253091be10cb',
    item_id: "R20231002-1025",
    image: '/assets/avatars/avatar-luis-lucero.png',
    item: 'Wrench',
    category: 'Tools',
    mechanic: "Luis Lucero",
    status: 'borrowed',
    created_at: new Date(2023, 6, 2),
    updated_at: new Date(2023, 6, 2),
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    item_id: "R20231002-0645",
    image: '/assets/avatars/avatar-andrei-nicholas.png',
    item: 'Wrench',
    category: 'Tools',
    mechanic: "Andrei Nicholas",
    status: 'borrowed',
    created_at: new Date(2023, 6, 2),
    updated_at: new Date(2023, 6, 2),
  },

];

const useInventorys = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useInventoryIds = (inventory) => {
  return useMemo(
    () => {
      return inventory.map((inventory) => inventory.id);
    },
    [inventory]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const inventory = useInventorys(page, rowsPerPage);
  const inventoryIds = useInventoryIds(inventory);
  const inventorySelection = useSelection(inventoryIds);

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
          Inventory | AutoAxis
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
                  Inventory
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
            <InventorySearch />
            <InventoryTable
              count={data.length}
              items={inventory}
              onDeselectAll={inventorySelection.handleDeselectAll}
              onDeselectOne={inventorySelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={inventorySelection.handleSelectAll}
              onSelectOne={inventorySelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={inventorySelection.selected}
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
