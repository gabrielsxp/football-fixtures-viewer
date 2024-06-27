import { Flex, Text, TextProps } from "@radix-ui/themes";

export interface IStatus {
  status: string;
}

const statusTransformer: {
  [x: string]: {
    color: TextProps["color"];
    text: string;
  };
} = {
  FINISHED: {
    color: "green",
    text: "Finalizado",
  },
  POSTPONED: {
    color: "orange",
    text: "Adiado",
  },
  SCHEDULED: {
    color: "blue",
    text: "Agendado",
  },
  TIMED: {
    color: "purple",
    text: "Definido",
  },
};

const Status = ({ status }: IStatus) => {
  const { color, text } = statusTransformer[status] ?? {
    color: "gray",
    text: "Desconhecido",
  };
  return (
    <Flex
      p="1"
      px="2"
      style={{
        background: `var(--${color}-a2)`,
        border: `1px solid var(--${color}-a4)`,
        borderRadius: "4px",
        alignSelf: "center",
      }}
      justify="center"
      role="status"
    >
      <Text align="center" truncate color={color}>
        {text}
      </Text>
    </Flex>
  );
};

export default Status;
