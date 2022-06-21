import React, { useCallback, useEffect, useRef } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";

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
      <Box width="100px">커스텀 확장자</Box>
      <Box>
        <Flex p="10px" gap="10px">
          <Input
            ref={addedExtensionInput}
            placeholder="확장자 입력"
            maxLength={20}
          />
          <Button onClick={handleAddCustomExtension}>추가</Button>
        </Flex>
        <Box p="10px">
          <Box>
            <span>
              {customExtensions.length}/{MAX_LIMIT}
            </span>
          </Box>
          <Flex flexWrap="wrap" gap="10px">
            {customExtensions.map((customExtension) => (
              <CustomExtensionItem
                key={customExtension}
                customExtension={customExtension}
                onClick={deleteCustomExtension}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
