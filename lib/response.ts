interface SucessResponseType<T> {
  data: T | T[];
  pagination: {
    current: number;
    total_page: number;
    total_data: number;
  } | null;
}

interface ErrorResponseType {
  errors: {
    [key: string]: string[];
  }[];
}
export const sucessResponse = <T>({
  data,
  pagination,
}: SucessResponseType<T>): SucessResponseType<T> => {
  return {
    data,
    pagination,
  };
};

export const errorResponse = ({
  errors,
}: ErrorResponseType): ErrorResponseType => {
  return {
    errors,
  };
};
