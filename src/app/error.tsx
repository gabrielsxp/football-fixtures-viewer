"use client"; // Error components must be Client Components

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <Flex className="flex min-h-screen flex-col items-center justify-items-center p-8 md:p-12 gap-2">
      <Heading color="red" size="5">
        Algo deu Errado!
      </Heading>
      {error?.message && (
        <Text size="3" color="crimson">
          {error?.message}
        </Text>
      )}
      <Button color="gray" onClick={() => reset()}>
        <ArrowLeftIcon /> Tentar Novamente
      </Button>
    </Flex>
  );
}
