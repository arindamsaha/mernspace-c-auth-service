import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, CreateDateColumn } from "typeorm"
import { User } from "./User.js";

@Entity()
export class RefreshToken {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'timestamp' })
    expiresAt!: Date;

    @ManyToOne(() => User)
    user!: User;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: number;
}
