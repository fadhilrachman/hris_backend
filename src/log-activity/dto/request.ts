import { Prisma } from '@prisma/client';

type ModuleAdminIntertalType =
  | 'admin-internal/admin'
  | 'admin-internal/company'
  | 'admin-internal/transaction';

type ModuleOperatorType =
  | 'operator/directorate'
  | 'operator/attendance'
  | 'operator/employee'
  | 'operator/admin';

export class CreateLogActivityDto {
  action_type: 'create' | 'update' | 'delete' | 'import';
  date: Date;
  module: ModuleAdminIntertalType | ModuleOperatorType;
  new_data: Prisma.JsonValue | null;
  previous_data: Prisma.JsonValue | null;
  user_id: string;
  company_id: string;
  activity: string;
  ip: string;
}
