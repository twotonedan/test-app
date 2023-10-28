import { Box, Button, IconButton, Typography } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

export const REUSABLE_CARDS = [
  {
    name: 'Norm Peterson',
    id: '228495',
    fields: [
      {
        headerName: 'Customer',
        value: 'Norm Peterson',
      },
      {
        headerName: 'Booking ID',
        value: (
          <Button variant='text' className='card-column-button booking-id' onClick={() => {}}>
            <Typography component='span'>#228495</Typography> <CallMadeIcon className='call-made-icon' />
          </Button>
        ),
      },
      {
        headerName: 'Item',
        value: 'Pontoon 1, Pontoon 2',
      },
      {
        headerName: 'Attendant',
        value: (
          <Box className='attendant'>
            <Typography component='span'>test</Typography>
            <IconButton className='card-column-button' onClick={() => {}}>
              <DeleteOutlineIcon className='delete-outline-icon' />
            </IconButton>
          </Box>
        ),
      },
      {
        headerName: 'Eatery',
        value: 'Hamburgers',
      },
      {
        headerName: 'Fourth Column',
        value: 'Fourth',
      },
    ],
    cardButtons: [
      {
        buttonLabel: 'Accessories',
        onClick: () => {},
      },
      {
        buttonLabel: 'Assign',
        onClick: () => {},
      },
      {
        buttonLabel: 'Launch',
        onClick: () => {},
      },
    ],
  },
  {
    name: 'Norm Meterson',
    id: '228496',
    fields: [
      {
        headerName: 'Booking ID',
        value: (
          <Button variant='text' className='card-column-button booking-id' onClick={() => {}}>
            <Typography component='span'>#228496</Typography> <CallMadeIcon className='call-made-icon' />
          </Button>
        ),
      },
      {
        headerName: 'Item',
        value: 'Pontoon 1, Pontoon 2',
      },
      {
        headerName: 'Attendant',
        value: (
          <Button variant='text' className='card-column-button attendant'>
            Assign
          </Button>
        ),
      },
      {
        headerName: 'Eatery',
        value: 'Hamburgers',
      },
    ],
    cardButtons: [
      {
        buttonLabel: 'Accessories',
        onClick: () => {},
      },
      {
        buttonLabel: 'Assign',
        onClick: () => {},
      },
      {
        buttonLabel: 'Launch',
        onClick: () => {},
      },
    ],
  },
  {
    name: 'Morm Peterson',
    id: '228497',
    fields: [
      {
        headerName: 'Booking ID',
        value: (
          <Button variant='text' className='card-column-button booking-id' onClick={() => {}}>
            <Typography component='span'>#228496</Typography> <CallMadeIcon className='call-made-icon' />
          </Button>
        ),
      },
      {
        headerName: 'Item',
        value: 'Pontoon 1, Pontoon 2',
      },
      {
        headerName: 'Attendant',
        value: (
          <Button variant='text' className='card-column-button attendant'>
            Assign
          </Button>
        ),
      },
      {
        headerName: 'Eatery',
        value: 'Hamburgers',
      },
    ],
    cardButtons: [
      {
        buttonLabel: 'Accessories',
        onClick: () => {},
      },
      {
        buttonLabel: 'Assign',
        onClick: () => {},
      },
      {
        buttonLabel: 'Launch',
        onClick: () => {},
      },
    ],
  },
  {
    name: 'Lorm Peterson',
    id: '228498',
    fields: [
      {
        headerName: 'Booking ID',
        value: (
          <Button variant='text' className='card-column-button booking-id' onClick={() => {}}>
            <Typography component='span'>#228496</Typography> <CallMadeIcon className='call-made-icon' />
          </Button>
        ),
      },
      {
        headerName: 'Item',
        value: 'Pontoon 1, Pontoon 2',
      },
      {
        headerName: 'Attendant',
        value: (
          <Button variant='text' className='card-column-button attendant'>
            Assign
          </Button>
        ),
      },
      {
        headerName: 'Eatery',
        value: 'Hamburgers',
      },
    ],
    cardButtons: [
      {
        buttonLabel: 'Accessories',
        onClick: () => {},
      },
      {
        buttonLabel: 'Assign',
        onClick: () => {},
      },
      {
        buttonLabel: 'Launch',
        onClick: () => {},
      },
    ],
  },
  {
    name: 'No Peterson',
    id: '228499',
    fields: [
      {
        headerName: 'Booking ID',
        value: (
          <Button variant='text' className='card-column-button booking-id' onClick={() => {}}>
            <Typography component='span'>#228496</Typography> <CallMadeIcon className='call-made-icon' />
          </Button>
        ),
      },
      {
        headerName: 'Item',
        value: 'Pontoon 1, Pontoon 2',
      },
      {
        headerName: 'Attendant',
        value: (
          <Button variant='text' className='card-column-button attendant'>
            Assign
          </Button>
        ),
      },
      {
        headerName: 'Eatery',
        value: 'Hamburgers',
      },
    ],
    cardButtons: [
      {
        buttonLabel: 'Accessories',
        onClick: () => {},
      },
      {
        buttonLabel: 'Assign',
        onClick: () => {},
      },
      {
        buttonLabel: 'Launch',
        onClick: () => {},
      },
    ],
  },
  {
    name: 'Norm Peter',
    id: '228500',
    fields: [
      {
        headerName: 'Booking ID',
        value: (
          <Button variant='text' className='card-column-button booking-id' onClick={() => {}}>
            <Typography component='span'>#228496</Typography> <CallMadeIcon className='call-made-icon' />
          </Button>
        ),
      },
      {
        headerName: 'Item',
        value: 'Pontoon 1, Pontoon 2',
      },
      {
        headerName: 'Attendant',
        value: (
          <Button variant='text' className='card-column-button attendant'>
            Assign
          </Button>
        ),
      },
      {
        headerName: 'Eatery',
        value: 'Hamburgers',
      },
    ],
    cardButtons: [
      {
        buttonLabel: 'Accessories',
        onClick: () => {},
      },
      {
        buttonLabel: 'Assign',
        onClick: () => {},
      },
      {
        buttonLabel: 'Launch',
        onClick: () => {},
      },
    ],
  },
  {
    name: 'Peterson',
    id: '228501',
    fields: [
      {
        headerName: 'Booking ID',
        value: (
          <Button variant='text' className='card-column-button booking-id' onClick={() => {}}>
            <Typography component='span'>#228496</Typography> <CallMadeIcon className='call-made-icon' />
          </Button>
        ),
      },
      {
        headerName: 'Item',
        value: 'Pontoon 1, Pontoon 2',
      },
      {
        headerName: 'Attendant',
        value: (
          <Button variant='text' className='card-column-button attendant'>
            Assign
          </Button>
        ),
      },
      {
        headerName: 'Eatery',
        value: 'Hamburgers',
      },
    ],
    cardButtons: [
      {
        buttonLabel: 'Accessories',
        onClick: () => {},
      },
      {
        buttonLabel: 'Assign',
        onClick: () => {},
      },
      {
        buttonLabel: 'Launch',
        onClick: () => {},
      },
    ],
  },
];

export const REUSABLE_CARDS_DRAWER_OPTIONS = [
  {
    topRow: [
      <Button variant='text' onClick={() => {}}>
        <InfoOutlinedIcon />
        <Typography component='span'>More Information</Typography>
      </Button>,
      <Button variant='text' onClick={() => {}}>
        <HeadsetMicOutlinedIcon />
        <Typography component='span'>Assign</Typography>
      </Button>,
      <Button variant='text' onClick={() => {}}>
        <PaidOutlinedIcon />
        <Typography component='span'>Add Charges</Typography>
      </Button>,
    ],
    bottomRow: [
      <Button variant='text' onClick={() => {}}>
        <Typography component='span'>Manage Accessories</Typography>
      </Button>,
      <Button variant='text' onClick={() => {}}>
        <Typography component='span'>Return</Typography>
      </Button>,
      <Button variant='text' onClick={() => {}}>
        <Typography component='span'>Mark Complete</Typography>
      </Button>,
      <Button variant='text' onClick={() => {}}>
        <Typography component='span'>Reset to Queued</Typography>
      </Button>,
    ],
  },
];
