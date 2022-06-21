import { Checkbox, CheckboxGroup, Flex } from "@chakra-ui/react";

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
    <Flex>
      <Flex width="300px">고정 확장자</Flex>
      <Flex>
        <CheckboxGroup>
          {Object.entries(fixedExtensions).map(([name, checked]) => (
            <Checkbox
              key={name}
              isChecked={checked}
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
        </CheckboxGroup>
      </Flex>
    </Flex>
  );
}
