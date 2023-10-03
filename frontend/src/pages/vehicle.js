import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { VehicleTable } from 'src/sections/vehicle/vehicle-table';
import { VehicleSearch } from 'src/sections/vehicle/vehicle-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

const data = [
  {
    id: '5e86809283e28b96d2d38537',
    vehicle_id: "R20231002-1145",
    brand: "Toyota",
    model: "Camry",
    plate_number: "XYZ 123",
    type: "Sedan",
    customer: 'Luigi Dela Cruz',
    avatar: '/assets/avatars/avatar-mark-galvez.png',
  },
  {
    id: '5e887ac47eed253091be10cb',
    vehicle_id: "R20231002-1025",
    brand: "Toyota",
    model: "Camry",
    plate_number: "XYZ 123",
    type: "Sedan",
    customer: 'Luis Lucero',
    avatar: '/assets/avatars/avatar-luis-lucero.png',
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    vehicle_id: "R20231002-0645",
    brand: "Toyota",
    model: "Camry",
    type: "Sedan",
    plate_number: "XYZ 123",
    customer: 'Andrei Nicholas',
  },

];

const useVehicles = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useVehicleIds = (vehicles) => {
  return useMemo(
    () => {
      return vehicles.map((vehicle) => vehicle.id);
    },
    [vehicles]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const vehicles = useVehicles(page, rowsPerPage);
  const vehiclesIds = useVehicleIds(vehicles);
  const vehiclesSelection = useSelection(vehiclesIds);

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
          Vehicle | AutoAxis
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
                  Vehicle
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
            <VehicleSearch />
            <VehicleTable
              count={data.length}
              items={vehicles}
              onDeselectAll={vehiclesSelection.handleDeselectAll}
              onDeselectOne={vehiclesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={vehiclesSelection.handleSelectAll}
              onSelectOne={vehiclesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={vehiclesSelection.selected}
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
