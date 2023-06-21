import { DeepPartial } from 'typeorm';
import { EventWinner } from '../../../domains/events-winners/events-winners.entity';

const userWins = [
  [16, 17, 18],
  [16, 20, 18],
  [16, 14, 17],
  [17, 16, 19],
  [19, 18, 15],
  [16, 22, 17],
  [17, 14, 16],
  [16, 18, 17],
  [22, 14, 16],
  [16, 19, 18],
];

export const eventsWinners: DeepPartial<EventWinner>[] = userWins.flatMap((ranks, index) => [
  {
    id: `88888888-06e5-4e9e-aa76-d7e12eba4a${String(index * 3).padStart(2, '0')}`,
    event: { id: `77777777-06e5-4e9e-aa76-d7e12eba4a${String(index + 1).padStart(2, '0')}` },
    userId: `c63a4bd1-cabd-44ee-b911-9ee2533dd0${String(ranks[0])}`,
    rank: 1,
  },
  {
    id: `88888888-06e5-4e9e-aa76-d7e12eba4a${String(index * 3 + 1).padStart(2, '0')}`,
    event: { id: `77777777-06e5-4e9e-aa76-d7e12eba4a${String(index + 1).padStart(2, '0')}` },
    userId: `c63a4bd1-cabd-44ee-b911-9ee2533dd0${String(ranks[1])}`,
    rank: 2,
  },
  {
    id: `88888888-06e5-4e9e-aa76-d7e12eba4a${String(index * 3 + 2).padStart(2, '0')}`,
    event: { id: `77777777-06e5-4e9e-aa76-d7e12eba4a${String(index + 1).padStart(2, '0')}` },
    userId: `c63a4bd1-cabd-44ee-b911-9ee2533dd0${String(ranks[2])}`,
    rank: 3,
  },
]);
