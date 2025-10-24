import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('temp_auth_codes')
export class TempAuthCode {
  @PrimaryColumn()
  code!: string;

  @Column()
  email!: string;

  @Column({ type: 'timestamp' })
  expiresAt!: Date;
}
