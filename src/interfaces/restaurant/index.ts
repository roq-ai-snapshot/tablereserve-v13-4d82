import { ReservationInterface } from 'interfaces/reservation';
import { TableConfigurationInterface } from 'interfaces/table-configuration';
import { WaiterInterface } from 'interfaces/waiter';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';

export interface RestaurantInterface {
  id?: string;
  organization_id: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  reservation?: ReservationInterface[];
  table_configuration?: TableConfigurationInterface[];
  waiter?: WaiterInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    reservation?: number;
    table_configuration?: number;
    waiter?: number;
  };
}
