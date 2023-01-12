import { Schedule } from "./schedules.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { hashSync } from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, type: "varchar" })
  name: string;

  @Column({ length: 120, type: "varchar", unique: true })
  email: string;

  @Column({ length: 11, type: "varchar", unique: true })
  cellphone: string;

  @Column({ length: 120, type: "varchar" })
  password: string;

  @Column({ type: "boolean", default: false })
  isAdm: boolean;

  @BeforeInsert()
  encryptPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => Schedule, (schedules) => schedules.user)
  schedules: Schedule[];
}
