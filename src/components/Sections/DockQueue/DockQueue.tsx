import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Footer from '@/components/Sections/Common/Footer/Footer';
import { TuneOutlined, ViewAgendaOutlined } from '@mui/icons-material';
import { styled, Grid, Drawer, Button } from '@mui/material';
import Sorting from '@/components/Common/Sorting';
import { useTranslation } from 'next-i18next';
import DataTable from '@/components/Common/DataTable';
import { DOCK_QUEUE_COLUMNS, DOCK_QUEUE_ACTIONS, WATER_QUEUE_ACTIONS, WATER_QUEUE_COLUMNS } from '@/mock/DOCK_QUEUE';
import ReusableCard from '@/components/Lists/ReusableCard';
import ViewList from '@/components/Lists/ViewList';
import {
  ICharge,
  IBooking,
  IModalType,
  IViewFormValues,
  IBookingFilter,
  IListFilter,
  ICardView,
  IBookingAccessory,
} from '@/types/dockQueue';
import ViewModal from '@/components/Common/ViewModal';
import NiceModal from '@ebay/nice-modal-react';
import useLocalStorageState from 'use-local-storage-state';
import useCreateDockQueueView from '@/hooks/api/useCreateDockQueueView';
import useDeleteDockQueueView from '@/hooks/api/useDeleteDockQueueView';
import useGetDockQueueViews from '@/hooks/api/useGetDockQueueViews';
import useGetWaterQueueViews from '@/hooks/api/useGetWaterQueueViews';
import useGetDockQueueBookings from '@/hooks/api/useGetDockQueueBookings';
import useGetWaterQueueBookings from '@/hooks/api/useGetWaterQueueBookings';
import ListFilterModal from '@/components/Common/ListFilterModal';
import theme from '@/theme';
import useGetUsers from '@/hooks/api/useGetUsers';
import useUpdateBooking from '@/hooks/api/useUpdateBooking';
import { sortFunction, mapCardProps, StyledContainer, StyledOptions } from './DockQueueUtils';
import Header from './Header';
import AssignModal from './AssignModal';
import AddChargesModal from './Charges/AddChargesModal';
import AccessoriesList from './Accessories/AccessoriesList';
import LaunchReturn from './LaunchReturn/LaunchReturn';

const ModalButton = styled(Button)`
  height: 100%;
  width: 30px;
  padding: 0;
  border-radius: 5px;
  color: ${theme.palette.customColors.labelGray};
  border-color: ${theme.palette.customColors.gray};
`;
const DockQueue = () => {
  const { t } = useTranslation(['actions']);
  const createViewMutation = useCreateDockQueueView();
  const deleteViewMutation = useDeleteDockQueueView();
  const useUpdateBookingMutation = useUpdateBooking();
  const [isCardView, setIsCardView] = useLocalStorageState<boolean>('is-card-view');
  const [isDockQueue, setIsDockQueue] = useLocalStorageState<boolean>('is-dock-queue');
  const { data: dockQueueViews, isLoading } = useGetDockQueueViews();
  const { data: waterQueueViews } = useGetWaterQueueViews();
  const views = isDockQueue ? dockQueueViews : waterQueueViews;
  const tableViews = views?.tableViews as ICardView[];
  const cardViews = views?.cardViews as ICardView[];
  const [currentCardViewId, setCurrentCardViewId] = useLocalStorageState<string>('current-card-view-id', {
    defaultValue: tableViews?.find(x => x.isDefault)?.id,
  });
  const [currentTableViewId, setCurrentTableViewId] = useLocalStorageState<string>('current-table-view-id', {
    defaultValue: cardViews?.find(x => x.isDefault)?.id,
  });
  const [savedFilters] = useLocalStorageState<IBookingFilter[]>('dock-queue-filters', {
    defaultValue: [],
  });

  const getCurrentView = () => {
    if (isCardView) {
      if (currentCardViewId) {
        return cardViews?.find(x => x.id === currentCardViewId);
      }
      const defaultCardView = cardViews?.find(x => x.isDefault);
      return defaultCardView;
    }
    if (currentTableViewId) {
      return tableViews?.find(x => x.id === currentTableViewId);
    }
    const defaultTableView = tableViews?.find(x => x.isDefault);
    return defaultTableView;
  };
  const currentView = getCurrentView();
  const [sortField, setSortField] = useState(currentView?.sortField || DOCK_QUEUE_COLUMNS[0].field);
  const [sortOrder, setSortOrder] = useState(currentView?.sortOrder || 'asc');

  const [showViewList, setShowViewList] = useState(false);
  const [showViewOptions, setShowViewOptions] = useState(false);
  const [showAccessoriesList, setShowAccessoriesList] = useState(false);
  const [showLaunchReturn, setShowLaunchReturn] = useState(false);
  const [viewModalType, setViewModalType] = useState('add');
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [tempFilterFields, setTempFilterFields] = useState(savedFilters);
  const [viewId, setViewId] = useState('');
  const callFilters = [...savedFilters, { field: 'isDockQueue', contains: (!!isDockQueue).toString() }];
  const { data: waterQueueBookings } = useGetWaterQueueBookings(callFilters);
  const { data: dockQueueBookings } = useGetDockQueueBookings(callFilters);
  const { data: users = [] } = useGetUsers();
  const bookings = isDockQueue ? dockQueueBookings : waterQueueBookings;
  useEffect(() => {
    if (currentView) {
      if (currentView.sortField) setSortField(currentView.sortField);
      if (currentView.sortOrder) setSortOrder(currentView.sortOrder);
    }
  }, [currentCardViewId, currentTableViewId, currentView]);
  if (isLoading || !currentView) return <div>Loading...</div>;
  const listData = {
    list: bookings?.sort((a, b) => sortFunction(a, b, currentView, sortField, sortOrder)) || [],
    totalSize: bookings?.length || 0,
  };
  const title = isDockQueue ? 'Dock Queue' : 'On The Water Queue';
  const addButtonConfig = {
    label: '+ Booking',
    onClick: () => {},
  };
  const newView: IViewFormValues = {
    name: '',
    isPrivate: false,
    columns: isDockQueue
      ? DOCK_QUEUE_COLUMNS.map(x => ({ ...x, show: true }))
      : WATER_QUEUE_COLUMNS.map(x => ({ ...x, show: true })),
    actions: isDockQueue ? DOCK_QUEUE_ACTIONS : WATER_QUEUE_ACTIONS,
    sortField: isDockQueue ? DOCK_QUEUE_COLUMNS[0].field : WATER_QUEUE_COLUMNS[0].field,
    sortOrder: 'asc',
  };
  const ButtonWrapper = styled(Grid)`
    display: flex;
    justify-content: center;
    button {
      height: 180px;
      width: 250px;
      &:first-of-type {
        margin-right: -20px;
        z-index: ${isDockQueue ? 1 : 0};
      }
      &:last-of-type {
        margin-left: -20px;
        z-index: ${isDockQueue ? 0 : 1};
      }
    }
  `;
  const listFilter: IListFilter = {
    sortField,
    sortOrder,
    setSortField,
    setSortOrder,
    fields: isDockQueue ? DOCK_QUEUE_COLUMNS : WATER_QUEUE_COLUMNS,
    setFilterFields: setTempFilterFields,
    filterFields: tempFilterFields,
    savedFilters,
  };
  const tempView = isCardView ? cardViews.find(x => x.id === viewId) : tableViews.find(x => x.id === viewId);
  const actionsMap = {
    accessories: (bookingId: string) => {
      setSelectedBookingId(bookingId);
      setShowAccessoriesList(true);
    },
    launch: (bookingId: string) => {
      setSelectedBookingId(bookingId);
      setShowLaunchReturn(true);
    },
    assign: (bookingId: string) => {
      setSelectedBookingId(bookingId);
      NiceModal.show('assign-modal');
    },
    return: (bookingId: string) => {
      setSelectedBookingId(bookingId);
      setShowLaunchReturn(true);
    },
    addCharges: (bookingId: string) => {
      setSelectedBookingId(bookingId);
      NiceModal.show('add-charges-modal');
    },
  };
  const selectedBooking = bookings?.find(x => x.id === selectedBookingId);
  const onAssign = (assigneeId: string) => {
    useUpdateBookingMutation.mutate({ ...selectedBooking, assignee: assigneeId } as IBooking);
    setSelectedBookingId('');
    NiceModal.hide('assign-modal');
  };
  const saveAddedCharges = (updatedCharges: ICharge[] | []) => {
    if (!selectedBooking) return;
    const updatedBooking = {
      ...selectedBooking,
      charges: updatedCharges,
    };
    useUpdateBookingMutation.mutate(updatedBooking);
    setSelectedBookingId('');
    NiceModal.hide('add-charges-modal');
  };
  const saveAccessories = (accessories: IBookingAccessory[] | []) => {
    if (!selectedBooking) return;
    const updatedBooking = {
      ...selectedBooking,
      accessories,
    };
    useUpdateBookingMutation.mutate(updatedBooking);
    setSelectedBookingId('');
  };
  const formattedColumns = currentView?.columns.map(x => ({
    ...x,
    formatter: DOCK_QUEUE_COLUMNS.find(y => y.field === x.field)?.formatter,
  }));
  return (
    <Layout title={title} header={<Header />} footer={<Footer />}>
      <StyledContainer container>
        <ButtonWrapper item xs={12}>
          <Button variant={isDockQueue ? 'contained' : 'outlined'} onClick={() => setIsDockQueue(true)}>
            {t('dockQueue')}
          </Button>
          <Button variant={isDockQueue ? 'outlined' : 'contained'} onClick={() => setIsDockQueue(false)}>
            {t('onTheWaterQueue')}
          </Button>
        </ButtonWrapper>
        <Grid container>
          <Grid item xs={9}>
            <Sorting
              columns={isDockQueue ? DOCK_QUEUE_COLUMNS : WATER_QUEUE_COLUMNS}
              sortField={sortField}
              setSortField={setSortField}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </Grid>
          <Grid item xs={3} style={{ paddingTop: '30px' }}>
            <ModalButton variant='outlined' onClick={() => NiceModal.show('list-filter-modal')}>
              <TuneOutlined />
            </ModalButton>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <Button variant='text' onClick={() => setShowViewList(!showViewList)}>
              {isCardView ? 'Select A Card View' : 'Select A Table View'}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <ModalButton
              variant='outlined'
              onClick={() => {
                localStorage.setItem('isCardView', JSON.stringify(!isCardView));
                setIsCardView(!isCardView);
              }}>
              <ViewAgendaOutlined />
            </ModalButton>
          </Grid>
        </Grid>
        {isCardView ? (
          listData.list.map(entry => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={entry.id}>
              <ReusableCard
                cardProps={mapCardProps({ view: { ...currentView, columns: formattedColumns }, entry, actionsMap })}
              />
            </Grid>
          ))
        ) : (
          <DataTable columns={formattedColumns} data={listData} addButtonConfig={addButtonConfig} />
        )}
      </StyledContainer>
      <Drawer anchor='top' open={showViewList} onClose={() => setShowViewList(false)}>
        <ViewList
          headerTitle={isCardView ? 'Card Views' : 'Table Views'}
          addButtonConfig={{
            onClick: () => {
              setViewModalType('add');
              setViewId('');
              NiceModal.show('view-modal');
            },
            label: 'view',
          }}
          optionsHandler={(id: string) => {
            setShowViewOptions(true);
            setViewId(id);
          }}
          closeButtonHandler={() => setShowViewList(false)}
          data={isCardView ? cardViews : tableViews}
          autoCompletePlaceholder='Search by view name'
        />
      </Drawer>
      {selectedBooking && (
        <Drawer anchor='top' open={showAccessoriesList} onClose={() => setShowAccessoriesList(false)}>
          <AccessoriesList
            saveAccessories={saveAccessories}
            closeButtonHandler={() => setShowAccessoriesList(false)}
            accessories={selectedBooking?.accessories}
          />
        </Drawer>
      )}
      {selectedBooking && (
        <Drawer anchor='top' open={showLaunchReturn} onClose={() => setShowLaunchReturn(false)}>
          <LaunchReturn closeButtonHandler={() => setShowLaunchReturn(false)} />
        </Drawer>
      )}
      <Drawer
        anchor='bottom'
        open={showViewOptions}
        onClose={() => {
          setShowViewOptions(false);
          setViewId('');
        }}>
        <StyledOptions container>
          <Grid item xs={12}>
            {tempView?.name}
          </Grid>
          <Grid item xs={12}>
            {!!isCardView && !!tempView && (
              <ReusableCard cardProps={mapCardProps({ view: tempView, actionsMap: {} })} />
            )}
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='contained'
              onClick={() => {
                setViewModalType('duplicate');
                NiceModal.show('view-modal');
              }}>
              Duplicate
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='contained'
              onClick={() => {
                setViewModalType('edit');
                NiceModal.show('view-modal');
              }}>
              Edit
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='contained'
              onClick={() => {
                if (isCardView) {
                  setCurrentCardViewId(viewId);
                } else {
                  setCurrentTableViewId(viewId);
                }
                setShowViewOptions(false);
                setShowViewList(false);
              }}>
              Apply
            </Button>
          </Grid>
        </StyledOptions>
      </Drawer>
      <ViewModal
        id='view-modal'
        data={tempView || newView}
        modalType={viewModalType as IModalType}
        isCardView={!!isCardView}
        deleteView={deleteViewMutation.mutate}
        createView={createViewMutation.mutate}
      />
      <ListFilterModal id='list-filter-modal' data={listFilter} />
      <AssignModal id='assign-modal' initId={selectedBooking?.assignee} onAssign={onAssign} users={users} />
      {selectedBooking && (
        <AddChargesModal id='add-charges-modal' booking={selectedBooking} saveAddedCharges={saveAddedCharges} />
      )}
    </Layout>
  );
};
export default DockQueue;
