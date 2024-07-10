import { Pagination } from './response';

export const createPagination = (props: {
  page: number;
  total_data: number;
  per_page: number;
}): Pagination => {
  return {
    current: props.page,
    total_data: props.total_data,
    total_page: Math.ceil(props.total_data / props.per_page),
  };
};
