import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./user";
import { Post } from "./post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  content!: string;

  @Column({ nullable: false })
  userId!: number;

  @ManyToOne((_type) => User, user => user.comments)
  @JoinColumn()
  user!: User;

  @Column({ nullable: false })
  postId!: number;

  @ManyToOne((_type) => Post, post => post.comments)
  @JoinColumn()
  post!: Post;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
