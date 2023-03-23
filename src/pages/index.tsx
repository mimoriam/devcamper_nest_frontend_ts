import {
  bootcampsKey,
  fetchBootcamps,
  useBootcamps,
  useUser,
} from "@/lib/fetching";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [bootcampsKey],
    queryFn: () => fetchBootcamps(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
}
export default function Home() {
  const { data, isLoading, isFetching, isSuccess, isError } = useBootcamps();

  const user = useUser();
  console.log(user);

  if (isLoading) return <div>Loading</div>;

  if (isError) return <div>Error</div>;

  // console.log(data);

  if (isSuccess) {
    return (
      <>
        <ul>
          {data.data?.map((bootcamp: any) => (
            <li key={bootcamp.id}>{bootcamp.name}</li>
          ))}
        </ul>
      </>
    );
  }
}
