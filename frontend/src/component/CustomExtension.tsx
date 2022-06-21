import React, { useCallback, useEffect, useRef } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

import { useCustomExtensionMutation } from "../hook";
import CustomExtensionItem from "./CustomExtensionItem";

interface CustomExtensionProps {
  fixedExtensions: Record<string, boolean>;
  customExtensionList: string[];
  errorCallback: (title: string, message: string) => void;
}

const MAX_LIMIT = 200;

export default function CustomExtension({
  fixedExtensions,
  customExtensionList,
  errorCallback,
}: CustomExtensionProps) {
  const addedExtensionInput = useRef<null | HTMLInputElement>(null);

  const {
    customExtensions,
    addCustomExtension,
    deleteCustomExtension,
    isAddSuccess,
  } = useCustomExtensionMutation({ customExtensionList, errorCallback });

  useEffect(() => {
    if (!isAddSuccess) return;
    if (addedExtensionInput.current) {
      addedExtensionInput.current.value = "";
    }
  }, [isAddSuccess]);

  const handleAddCustomExtension = useCallback(async () => {
    const addedCustomExtension = addedExtensionInput?.current?.value?.trim();

    if (
      addedCustomExtension === undefined ||
      addedCustomExtension.length === 0
    ) {
      errorCallback("커스텀 확장지 알림", "추가할 확장자를 입력해 주세요.");
      return;
    }
    if (customExtensions.includes(addedCustomExtension)) {
      errorCallback("커스텀 확장지 알림", "이미 추가된 커스텀 확장자 입니다.");
      return;
    }

    if (fixedExtensions[addedCustomExtension] !== undefined) {
      errorCallback("커스텀 확장지 알림", "고정 확장자에서 선택해 주세요.");
      return;
    }

    addCustomExtension(addedCustomExtension);
  }, [addCustomExtension, customExtensions, errorCallback, fixedExtensions]);

  return (
    <Flex>
      <Flex p={3} flexShrink={0} width="150px">
        <Text fontSize="xl">커스텀 확장자</Text>
      </Flex>
      <Flex direction="column" flexGrow={1} p={3}>
        <Flex gap={3}>
          <Input
            ref={addedExtensionInput}
            placeholder="확장자 입력"
            maxLength={20}
          />
          <Button onClick={handleAddCustomExtension}>추가</Button>
        </Flex>
        <Box
          p={3}
          mt={3}
          border="1px solid black"
          borderRadius="5px"
          borderColor="#d3cfcf"
        >
          <Box>
            <span>
              {customExtensions.length}/{MAX_LIMIT}
            </span>
          </Box>
          <Flex flexWrap="wrap" gap={3} mt={3}>
            {customExtensions.map((customExtension) => (
              <CustomExtensionItem
                key={customExtension}
                customExtension={customExtension}
                onClick={deleteCustomExtension}
              />
            ))}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
