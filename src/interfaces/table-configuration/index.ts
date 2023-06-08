import { RestaurantInterface } from 'interfaces/restaurant';

export interface TableConfigurationInterface {
  id?: string;
  restaurant_id: string;
  table_id: string;
  configuration: string;
  created_at?: Date;
  updated_at?: Date;

  restaurant?: RestaurantInterface;
  _count?: {};
}
