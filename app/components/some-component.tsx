"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function getUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const users = await res.json();
  console.log("RUN GET");
  return users;
}

async function postUser(props: any) {
  console.log("props: ", props);
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "測試",
      body: "BODYBODY",
      userId: "123",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("response: " + JSON.stringify(json));
    });
}

export default function SomeComponent() {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const {
    isLoading: mutateIsLoading,
    isError,
    isSuccess,
    mutate,
  } = useMutation({
    mutationFn: (data: any) => postUser(data),
    onSuccess: (newPost) => {
      queryClient.invalidateQueries(["user"]);
      //queryClient.setQueryData(["user"], newPost);
    },
  });

  return (
    <div>
      {isLoading ? "Loading..." : <h1 className="font-bold">{data?.title}</h1>}
      <div>
        {mutateIsLoading ? (
          "Adding todo..."
        ) : (
          <>
            {isError ? <div>An error occurred!</div> : null}
            {isSuccess ? <div>Todo added!</div> : null}
            <button
              onClick={() => {
                mutate({ id: new Date(), title: "Do Laundry" });
              }}
            >
              Create Todo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
