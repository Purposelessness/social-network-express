import * as v from 'valibot';

import {DateSchema, EmailSchema, IntegerSchema} from '~src/libraries/parsers/common';

export const USER_SCHEMA = {
  name: v.string('Name must be a string'),
  email: EmailSchema('email'),
  birthDate: DateSchema('birthDate'),
};

export const BaseUserSchema = v.object({...USER_SCHEMA});
export type BaseUserRecord = v.Output<typeof BaseUserSchema>;

export const UserSchema = v.object({
  id: IntegerSchema('id'),
  ...USER_SCHEMA,
});
export type UserRecord = v.Output<typeof UserSchema>;

export class User {
  constructor(
      public readonly id: bigint,
      public name: string,
      public email: string,
      public birthDate: string,
  ) {
  }

  public static fromRecord(id: bigint, record: BaseUserRecord): User {
    return new User(id, record.name, record.email, record.birthDate);
  }

  public static fromEntryRecord(record: UserRecord): User {
    return new User(record.id, record.name, record.email, record.birthDate);
  }
}