"use client";

import useReplaceRouteQuery from "@/hooks/useReplaceRouteQuery";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { orderBy } from "lodash";
import Image from "next/image";
import { useState } from "react";
import { IChampionship, IMatchday, ITeam } from "../../../global";

type IDropdownElement = ITeam | IChampionship;

export interface IDropdown {
  data: {
    [x: string]:
      | ITeam
      | IChampionship
      | IMatchday
      | { name: string; id: number };
  };
  iconAttribute?: string;
  queryAttribute: string;
  defaultValue?: string;
  placeholder?: string;
  paramsBlacklist?: string[];
  shouldOrderList?: boolean;
  id?: string;
}

const Dropdown = ({
  data,
  defaultValue = "",
  queryAttribute,
  iconAttribute,
  placeholder = "Selecione um atributo",
  paramsBlacklist = [],
  shouldOrderList = true,
  id,
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
        <Text role="label" htmlFor={id} weight="bold">
          {placeholder}
        </Text>
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
        <Select.Trigger name={id} id={id} placeholder={placeholder}>
          <Flex as="span" align="center" gap="2">
            {!!value && !!data?.[value] && icon && (
              <Image
                width={24}
                height={24}
                src={icon}
                alt={`${data[value].name} ícone`}
              />
            )}
            {!!value && !!data?.[value] && data[value].name}
          </Flex>
        </Select.Trigger>
        <Select.Content position="popper">
          {listing.map((elementData) => (
            <Select.Item key={elementData.id} value={String(elementData.id)}>
              <Flex align="center" gap="4">
                {iconAttribute && !!elementData?.[iconAttributeKey] && (
                  <Image
                    width={24}
                    height={24}
                    src={elementData?.[iconAttributeKey] as string}
                    alt={`${elementData.name} ícone`}
                  />
                )}
                {elementData.name}
              </Flex>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default Dropdown;
