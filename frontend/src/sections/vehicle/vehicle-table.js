import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box, Button,
  Card,
  Checkbox, IconButton,
  Stack, SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import { SeverityPill } from '../../components/severity-pill';

const statusMap = {
  ongoing: 'warning',
  completed: 'success',
};

const vehicleStatusMap = {
  pending: 'warning',
  paid: 'success',
};


export const VehicleTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Vehicle ID</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Plate Number</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((vehicle) => {
                const isSelected = selected.includes(vehicle.id);
                return (
                  <TableRow
                    hover
                    key={vehicle.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(vehicle.id);
                          } else {
                            onDeselectOne?.(vehicle.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {vehicle.vehicle_id}
                    </TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.plate_number}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={vehicle.avatar}>
                          {getInitials(vehicle.customer)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {vehicle.customer}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={0}
                      >
                        <IconButton size="small" color="primary">
                          <SvgIcon fontSize="small">
                            <PencilIcon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton size="small" color="error">
                          <SvgIcon fontSize="small">
                            <TrashIcon />
                          </SvgIcon>
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

VehicleTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
