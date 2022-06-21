import { Checkbox, CheckboxGroup, Flex, Text } from "@chakra-ui/react";

import { useFixedExtensionMutation } from "../hook";

type FixedExtensionObject = Record<string, boolean>;

interface FixedExtensionProps {
  fixedExtensionList: FixedExtensionObject;
  errorCallback: (title: string, message: string) => void;
}

export default function FixedExtension({
  fixedExtensionList,
  errorCallback,
}: FixedExtensionProps) {
  const { fixedExtensions, addFixedExtension, deleteFixedExtension } =
    useFixedExtensionMutation({
      fixedExtensionList,
      errorCallback,
    });

  return (
    <Flex mt={3}>
      <Flex p="10px" flexShrink={0} width="150px">
        <Text fontSize="xl">고정 확장자</Text>
      </Flex>
      <Flex p="10px">
        <CheckboxGroup>
          <Flex direction={["row"]} flexWrap="wrap" gap={4}>
            {Object.entries(fixedExtensions).map(([name, checked]) => (
              <Checkbox
                key={name}
                isChecked={checked}
                _hover={{ backgroundColor: "#eee" }}
                p={1}
                borderRadius={4}
                onChange={() => {
                  if (checked) {
                    deleteFixedExtension(name);
                  } else {
                    addFixedExtension(name);
                  }
                }}
              >
                {name}
              </Checkbox>
            ))}
          </Flex>
        </CheckboxGroup>
      </Flex>
    </Flex>
  );
}
