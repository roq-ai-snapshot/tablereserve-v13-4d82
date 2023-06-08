const mapping: Record<string, string> = {
  organizations: 'organization',
  reservations: 'reservation',
  restaurants: 'restaurant',
  'table-configurations': 'table_configuration',
  users: 'user',
  waiters: 'waiter',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
