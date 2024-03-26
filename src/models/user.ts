import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn
} from "typeorm";

import { Post } from "./post";
import { Comment } from "./comment";

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @OneToMany((_type) => Post, post => post.user)
  posts!: Post[];

  @OneToMany((_type) => Comment, comment => comment.user)
  comments!: Comment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
