import ReactQueryHydrate from "@/components/hydrate-client";
import getQueryClient from "@/app/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import SomeComponent from "@/app/components/some-component";

async function getUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const users = await res.json();
  return users;
}

export default async function Profile() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["user"], getUser);
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <div>
        <SomeComponent />
      </div>
    </ReactQueryHydrate>
  );
}
