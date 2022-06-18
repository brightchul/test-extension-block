import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";

import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Container,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

async function getAll() {
  return axios
    .get("http://localhost:8080/extension/all")
    .then((res) => res.data);
}

async function addCustomExtensionAPI(extensionName: string) {
  return axios
    .post(`http://localhost:8080/extension/custom/${extensionName}`)
    .then((res) => res.data);
}

async function deleteCustomExtensionAPI(extensionName: string) {
  return axios
    .delete(`http://localhost:8080/extension/custom/${extensionName}`)
    .then((res) => res.data);
}

async function addFixedExtensionAPI(extensionName: string) {
  return axios
    .post(`http://localhost:8080/extension/fixed/${extensionName}`)
    .then((res) => res.data);
}

async function deleteFixedExtensionAPI(extensionName: string) {
  return axios
    .delete(`http://localhost:8080/extension/fixed/${extensionName}`)
    .then((res) => res.data);
}

interface Extension {
  createdDate: string;
  extensionName: string;
  id: number;
  type: "fixed" | "custom";
}

function App() {
  const [fixedExtensions, setFixedExtensions] = useState<
    Record<string, boolean>
  >({
    bat: false,
    cmd: false,
    com: false,
    cpl: false,
    exe: false,
    scr: false,
    js: false,
  });

  const [addedCustomExtension, setAddedCustomExtension] = useState("");
  const [customExtensions, setCustomExtensions] = useState([] as string[]);
  const [errorInfo, setErrorInfo] = useState({ title: "", message: "" });

  const addedExtensionInput = useRef(null);

  const { data } = useQuery<Extension[]>("todo", getAll);

  const { mutate: addCustomExtension } = useMutation(addCustomExtensionAPI, {
    onError: (error: any) => {
      const { errorMessage } = error.response.data;
      setErrorInfo({
        title: "커스텀 확장자 추가 에러",
        message: errorMessage,
      });
      onOpen();
    },
    onSuccess: () => {
      setCustomExtensions([...customExtensions, addedCustomExtension]);
      setAddedCustomExtension("");
    },
  });

  const { mutate: deleteCustomExtension } = useMutation(
    deleteCustomExtensionAPI,
    {
      onError: (error: any) => {
        const { errorMessage } = error.response.data;
        setErrorInfo({
          title: "커스텀 확장자 추가 에러",
          message: errorMessage,
        });
        onOpen();
      },
      onSuccess: (_, deletedExtensionName) => {
        setCustomExtensions(
          customExtensions.filter((ext) => ext !== deletedExtensionName)
        );
      },
    }
  );

  const { mutate: addFixedExtension } = useMutation(addFixedExtensionAPI, {
    onError: (error: any) => {
      const { errorMessage } = error.response.data;
      setErrorInfo({
        title: "커스텀 확장자 추가 에러",
        message: errorMessage,
      });
      onOpen();
    },
    onSuccess: ({ data }) => {
      const { extensionName } = data;
      setFixedExtensions({
        ...fixedExtensions,
        [extensionName]: true,
      });
    },
  });

  const { mutate: deleteFixedExtension } = useMutation(
    deleteFixedExtensionAPI,
    {
      onError: (error: any) => {
        const { errorMessage } = error.response.data;
        setErrorInfo({
          title: "커스텀 확장자 추가 에러",
          message: errorMessage,
        });
        onOpen();
      },
      onSuccess: (_, extensionName) => {
        setFixedExtensions({
          ...fixedExtensions,
          [extensionName]: false,
        });
      },
    }
  );

  useEffect(() => {
    if (!data) return;
    if (data.length === 0) return;

    const existedFixedList = data
      .filter((one) => one.type === "fixed")
      .map((one) => one.extensionName);

    const newFixedExtensions = Object.keys(fixedExtensions).reduce(
      (obj, one) => {
        obj[one] = existedFixedList.includes(one);
        return obj;
      },
      { ...fixedExtensions }
    );

    const customList = data
      .filter((one) => one.type === "custom")
      .map((one) => one.extensionName);

    setFixedExtensions(newFixedExtensions);
    setCustomExtensions(customList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Container width="xxl">
        <Flex>
          <Flex width="300px">고정 확장자</Flex>
          <Flex>
            <CheckboxGroup>
              {Object.entries(fixedExtensions).map(([name, checked]) => (
                <Checkbox
                  key={name}
                  isChecked={checked}
                  onChange={({ target }) => {
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
        <Flex>
          <Box width="100px">커스텀 확장자</Box>
          <Box>
            <Flex p="10px" gap="10px">
              <Input
                ref={addedExtensionInput}
                placeholder="확장자 입력"
                value={addedCustomExtension}
                maxLength={20}
                onChange={({ target }) => {
                  setAddedCustomExtension(target.value.trim());
                }}
              />
              <Button
                onClick={async () => {
                  if (customExtensions.includes(addedCustomExtension)) {
                    setErrorInfo({
                      title: "커스텀 확장지 알림",
                      message: "이미 추가된 커스텀 확장자 입니다.",
                    });
                    onOpen();
                    return;
                  }

                  if (fixedExtensions[addedCustomExtension] !== undefined) {
                    setErrorInfo({
                      title: "커스텀 확장지 알림",
                      message: "고정 확장자에서 선택해 주세요",
                    });
                    onOpen();
                    return;
                  }

                  if (addedCustomExtension.length === 0) return;

                  addCustomExtension(addedCustomExtension);
                }}
              >
                추가
              </Button>
            </Flex>
            <Box p="10px">
              <Box>
                <span>{customExtensions.length}/200</span>
              </Box>
              <Flex flexWrap="wrap" gap="10px">
                {customExtensions.map((customextension) => {
                  return (
                    <Flex
                      key={customextension}
                      alignContent="center"
                      padding={2}
                      border="1px solid black"
                      borderRadius="10px"
                    >
                      <Text
                        fontSize="lg"
                        sx={{
                          lineHeight: "1.2em",
                        }}
                      >
                        {customextension}
                      </Text>
                      <CloseButton
                        size="sm"
                        onClick={() => deleteCustomExtension(customextension)}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{errorInfo.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{errorInfo.message}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
