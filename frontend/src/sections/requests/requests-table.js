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


export const RequestsTable = (props) => {
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
                <TableCell>Requests ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Provider ID</TableCell>
                <TableCell>Datetime</TableCell>
                <TableCell>Pick up Location</TableCell>
                <TableCell>Drop off Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((reservation) => {
                const isSelected = selected.includes(reservation.id);
                const createdAt = format(reservation.datetime, 'dd/MM/yyyy');
                return (
                  <TableRow
                    hover
                    key={reservation.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(reservation.id);
                          } else {
                            onDeselectOne?.(reservation.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {reservation.request_id}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={reservation.avatar}>
                          {getInitials(reservation.customer)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {reservation.customer}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{reservation.towing_provider}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>{reservation.pick_up_location}</TableCell>
                    <TableCell>{reservation.drop_off_location}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[reservation.status]}>
                        {reservation.status}
                      </SeverityPill>
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

RequestsTable.propTypes = {
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
