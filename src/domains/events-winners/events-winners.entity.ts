import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Event } from '../events/events.entity';

@Entity()
export class EventWinner {
  @PrimaryColumn({ type: 'uuid', name: 'eventId' })
  eventId: string;

  @ManyToOne(() => Event, (event) => event.winners, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'eventId', referencedColumnName: 'id' }])
  event: Event;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @PrimaryColumn({ type: 'int', name: 'rank' })
  rank: number;
}
