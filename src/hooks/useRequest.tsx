import { useEffect, useState } from "react";

export function useRequest<T>(requestFn: () => Promise<T>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const request = async () => {
    setLoading(true);
    try {
      const response = await requestFn();
      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    request();
    return () => {
      setLoading(false);
      setData(null);
      setError(null);
    };
  }, []);

  return { loading, data, error };
}
