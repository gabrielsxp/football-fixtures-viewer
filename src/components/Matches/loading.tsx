import { Flex, Skeleton } from "@radix-ui/themes";

export const Loading = () => {
  return (
    <Flex direction="column">
      <Skeleton height="64px" mb="4" width="100%" />
      <Skeleton height="100vh" width="100%" />
    </Flex>
  );
};
