"use client";

import { Hydrate, HydrateProps } from "@tanstack/react-query";

function ReactQueryHydrate(props: HydrateProps) {
  return <Hydrate {...props} />;
}

export default ReactQueryHydrate;
