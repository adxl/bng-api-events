import { DeepPartial } from 'typeorm';
import { EventWinner } from '../../../domains/events-winners/events-winners.entity';

const userWins = [
  [3, 4, 5],
  [3, 7, 5],
  [3, 1, 4],
  [4, 3, 6],
  [6, 5, 2],
  [3, 9, 4],
  [4, 1, 3],
  [3, 5, 4],
  [9, 1, 3],
  [3, 6, 5],
  [null, null, null],
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const eventsWinners: DeepPartial<EventWinner>[] = userWins.flatMap((ranks, index) => [
  {
    id: `88888888-06e5-4e9e-aa76-d7e12eba4a${String(index * 3).padStart(2, '0')}`,
    event: { id: `77777777-06e5-4e9e-aa76-d7e12eba4a${String(index + 1).padStart(2, '0')}` },
    userId: ranks[0] ? 'c63a4bd1-cabd-44ee-b911-9ee2533dd00' + String(ranks[0]) : null,
    rank: 1,
  },
  {
    id: `88888888-06e5-4e9e-aa76-d7e12eba4a${String(index * 3 + 1).padStart(2, '0')}`,
    event: { id: `77777777-06e5-4e9e-aa76-d7e12eba4a${String(index + 1).padStart(2, '0')}` },
    userId: ranks[1] ? 'c63a4bd1-cabd-44ee-b911-9ee2533dd00' + String(ranks[1]) : null,
    rank: 2,
  },
  {
    id: `88888888-06e5-4e9e-aa76-d7e12eba4a${String(index * 3 + 2).padStart(2, '0')}`,
    event: { id: `77777777-06e5-4e9e-aa76-d7e12eba4a${String(index + 1).padStart(2, '0')}` },
    userId: ranks[2] ? 'c63a4bd1-cabd-44ee-b911-9ee2533dd00' + String(ranks[2]) : null,
    rank: 3,
  },
]);
