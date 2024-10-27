import { TProfileApi } from 'shared';

type TMutations = {
  onSuccess?: (data: TProfileApi) => void;
  onError?: (errMsg: string) => void;
};

export type { TMutations };
