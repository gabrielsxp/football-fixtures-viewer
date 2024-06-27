"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function GlobalError({
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
      {error?.message?.includes("Please check your subscription") ? (
        <>
          <Text size="3" color="crimson">
            Sem permissão para buscar este campeonato
          </Text>
          <Button
            color="gray"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <ArrowLeftIcon /> Voltar ao início
          </Button>
        </>
      ) : (
        <Button color="gray" onClick={() => reset()}>
          <ArrowLeftIcon /> Tentar Novamente
        </Button>
      )}
    </Flex>
  );
}
