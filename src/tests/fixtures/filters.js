import moment from 'moment';

export const filters = {
  text: '',
  sortBy: undefined,
  startDate: undefined,
  endDate: undefined,
}

export const allFilters = {
  text: 'bills',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days'),
}
