import { User } from "./user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  time: string;

  @Column({ length: 120, type: "varchar" })
  service: string;

  @ManyToOne(() => User, (user) => user.schedules)
  @JoinColumn()
  user: User;
}
