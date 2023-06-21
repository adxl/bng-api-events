import { Event } from 'src/domains/events/events.entity';
import { DeepPartial } from 'typeorm';

const stationsMap = [1, 3, 4, 5, 2, 2, 1, 8, 6, 1, 2];

export const events: DeepPartial<Event>[] = Array(11)
  .fill(null)
  .map((_, index) => ({
    id: `77777777-06e5-4e9e-aa76-d7e12eba4a${String(index + 1).padStart(2, '0')}`,
    name: `Event ${index + 1}`,
    startsAt: `2022-${String(index + 1).padStart(2, '0')}-01T09:00`,
    endedAt: index !== 10 ? `2022-${String(index + 1).padStart(2, '0')}-04T12:00` : null,
    stationId: `11111111-bab3-439d-965d-0522568b000${stationsMap[index]}`,
  }));
