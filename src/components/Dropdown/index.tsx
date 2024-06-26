"use client";

import useReplaceRouteQuery from "@/hooks/useReplaceRouteQuery";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { orderBy } from "lodash";
import Image from "next/image";
import { useState } from "react";
import { IChampionship, IMatchday, ITeam } from "../../../global";

type IDropdownElement = ITeam | IChampionship;

interface IDropdown {
  data: { [x: string]: ITeam | IChampionship | IMatchday };
  iconAttribute?: string;
  queryAttribute: string;
  defaultValue?: string;
  placeholder?: string;
  paramsBlacklist?: string[];
  shouldOrderList?: boolean;
}

const Dropdown = ({
  data,
  defaultValue = "",
  queryAttribute,
  iconAttribute,
  placeholder = "Selecione um atributo",
  paramsBlacklist = [],
  shouldOrderList = true,
}: IDropdown) => {
  const [value, setValue] = useState(defaultValue);

  const { handleQueryReplacement } = useReplaceRouteQuery(paramsBlacklist);

  const onChange = (selectedAttribute: string) => {
    setValue(selectedAttribute);
    handleQueryReplacement(
      { [queryAttribute]: selectedAttribute },
      !!selectedAttribute ? "set" : "delete"
    );
  };

  const iconAttributeKey = iconAttribute as keyof IDropdownElement;
  const icon = data?.[value]?.[iconAttributeKey] as string;

  const listing = shouldOrderList
    ? orderBy(Object.values(data), ["name"], ["asc"])
    : Object.values(data);

  return (
    <Flex direction="column" className="w-full">
      <Flex gap="4" align="center" mb="2">
        <Text weight="bold">{placeholder}</Text>
        {value && (
          <Button
            onClick={() => onChange("")}
            size="1"
            variant="soft"
            color="gray"
          >
            <Cross2Icon /> Limpar Seleção
          </Button>
        )}
      </Flex>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger placeholder={placeholder}>
          <Flex as="span" align="center" gap="2">
            {!!value && !!data?.[value] && icon && (
              <Image
                width={24}
                height={24}
                src={icon}
                alt={`${data[value].name} championship crest`}
              />
            )}
            {!!value && !!data?.[value] && data[value].name}
          </Flex>
        </Select.Trigger>
        <Select.Content position="popper">
          {listing.map(({ name, id }) => (
            <Select.Item key={id} value={String(id)}>
              {name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default Dropdown;
