import { Event } from '../../../domains/events/events.entity';
import { DeepPartial } from 'typeorm';
import { faker } from '@faker-js/faker';

const stationsMap = [1, 3, 4, 5, 2, 2, 1, 8, 6, 1];

export const events: DeepPartial<Event>[] = [
  ...Array(10)
    .fill(null)
    .map((_, index) => ({
      id: '77777777-06e5-4e9e-aa76-d7e12eba4a' + String(index + 1).padStart(2, '0'),
      name: faker.music.songName(),
      startsAt: '2023-06-' + String(2 * index + 1).padStart(2, '0') + 'T16:00',
      endedAt: '2023-06-' + String(2 * index + 1).padStart(2, '0') + 'T23:00',
      stationId: `11111111-bab3-439d-965d-0522568b000${stationsMap[index]}`,
    })),
  {
    id: '77777777-06e5-4e9e-aa76-d7e12eba4a11',
    name: faker.music.songName(),
    startsAt: '2023-07-04T16:00',
    endedAt: '2023-07-04T23:00',
    stationId: '11111111-bab3-439d-965d-0522568b0003',
  },
  {
    id: '77777777-06e5-4e9e-aa76-d7e12eba4a12',
    name: faker.music.songName(),
    startsAt: '2023-07-06T16:00',
    endedAt: '2023-07-06T23:00',
    stationId: '11111111-bab3-439d-965d-0522568b0003',
  },
  {
    id: '77777777-06e5-4e9e-aa76-d7e12eba4a13',
    name: faker.music.songName(),
    startsAt: '2023-07-11T16:00',
    endedAt: '2023-07-11T23:00',
    stationId: '11111111-bab3-439d-965d-0522568b0003',
  },
  {
    id: '77777777-06e5-4e9e-aa76-d7e12eba4a14',
    name: faker.music.songName(),
    startsAt: '2023-07-18T16:00',
    endedAt: null,
    stationId: '11111111-bab3-439d-965d-0522568b0003',
  },
];
