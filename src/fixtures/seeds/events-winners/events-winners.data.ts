import { DeepPartial } from 'typeorm';
import { EventWinner } from '../../../domains/events-winners/events-winners.entity';

export const eventsWinners: DeepPartial<EventWinner>[] = [
  {
    event: {
      id: '1a6bf203-06e5-4e9e-aa76-d7e12eba4a01',
    },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd014',
    rank: 1,
  },
  {
    event: {
      id: '1a6bf203-06e5-4e9e-aa76-d7e12eba4a01',
    },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd017',
    rank: 2,
  },
  {
    event: {
      id: '1a6bf203-06e5-4e9e-aa76-d7e12eba4a01',
    },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd020',
    rank: 3,
  },
  {
    event: {
      id: '1a6bf203-06e5-4e9e-aa76-d7e12eba4a02',
    },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd025',
    rank: 1,
  },
  {
    event: {
      id: '1a6bf203-06e5-4e9e-aa76-d7e12eba4a02',
    },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd016',
    rank: 2,
  },
  {
    event: {
      id: '1a6bf203-06e5-4e9e-aa76-d7e12eba4a02',
    },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd014',
    rank: 3,
  },
];
