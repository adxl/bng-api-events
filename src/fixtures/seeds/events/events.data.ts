import { Event } from 'src/domains/events/events.entity';
import { DeepPartial } from 'typeorm';

export const events: DeepPartial<Event>[] = [
  {
    id: '1a6bf203-06e5-4e9e-aa76-d7e12eba4a01',
    name: 'Event 1',
    startsAt: '2023-05-05T13:46:53+0000',
    endedAt: '2023-05-08T13:46:53+0000',
    stationId: '11111111-bab3-439d-965d-0522568b0005',
  },
  {
    id: '1a6bf203-06e5-4e9e-aa76-d7e12eba4a02',
    name: 'Event 2',
    startsAt: '2023-06-10T13:46:53+0000',
    endedAt: '2023-06-15T13:46:53+0000',
    stationId: '11111111-bab3-439d-965d-0522568b0003',
  },
  {
    id: '1a6bf203-06e5-4e9e-aa76-d7e12eba4a03',
    name: 'Event 3',
    startsAt: '2023-06-20T13:46:53+0000',
    endedAt: null,
    stationId: '11111111-bab3-439d-965d-0522568b0001',
  },
];
