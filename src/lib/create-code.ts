const LIST_CODE = {
  ['admin-internal/company']: 'COMP',
  ['admin-internal/admin']: 'ADM',
};
type CodeKeys = keyof typeof LIST_CODE;

export const createCode = ({
  length,
  code,
}: {
  length: number;
  code: CodeKeys;
}) => {
  const zeroList = {
    1: '00000',
    2: '0000',
    3: '000',
    4: '00',
    5: '0',
  };

  return `${LIST_CODE[code]}${zeroList[String(length + 1).length]}${length + 1}`;
};
