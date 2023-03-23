import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// https://www.reddit.com/r/reactjs/comments/jd5oxu/does_reactquery_make_sense_in_an_auth_provider/

const URL = "http://localhost:3000/api/v1";
export const bootcampsKey = "bootcamps";
export const userKey = "user";

export let accessT: string;
export let refreshT: string;

export const fetchJson = async (url: string, options?: any) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export const fetchBootcamps = async () => {
  const response = await fetch(`${URL}/bootcamps`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export const useBootcamps = () => {
  return useQuery({
    queryKey: [bootcampsKey],
    queryFn: () => fetchBootcamps(),
  });
};

export const login = async (email: string, password: string) => {
  const data = await fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!data.ok) {
    throw new Error(data.statusText);
  }

  const tokens = await data.json();

  accessT = tokens.accessToken;
  refreshT = tokens.refreshToken;

  return true;
};

export const useUser = () => {
  const query = useQuery([userKey], async () => {
    try {
      return await fetchJson(`${URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessT}`,
        },
      });
    } catch (err) {
      return null;
    }
  });
  return query.data;
};
