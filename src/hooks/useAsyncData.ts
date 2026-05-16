import { useEffect, useState, type DependencyList } from 'react';

interface AsyncState<T> {
  data: T;
  error: string | null;
  loading: boolean;
}

export function useAsyncData<T>(loader: () => Promise<T>, emptyValue: T, dependencies: DependencyList = []) {
  const [state, setState] = useState<AsyncState<T>>({
    data: emptyValue,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;

    setState((current) => ({ ...current, loading: true, error: null }));
    loader()
      .then((data) => {
        if (active) {
          setState({ data, error: null, loading: false });
        }
      })
      .catch(() => {
        if (active) {
          setState({ data: emptyValue, error: '内容服务暂时不可用，当前显示空状态。', loading: false });
        }
      });

    return () => {
      active = false;
    };
    // The caller owns this small hook's reload boundary; values are stable route/page inputs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}
