import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventWinner } from '../events-winners/events-winners.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startsAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endedAt: Date | null;

  @Column('uuid')
  stationId: string;

  @OneToMany(() => EventWinner, (eventWinner) => eventWinner.event)
  winners: EventWinner[];
}
