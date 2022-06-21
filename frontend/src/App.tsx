import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Container, useDisclosure } from "@chakra-ui/react";

import CustomExtension from "./component/CustomExtension";
import ErrorModal from "./component/ErrorModal";
import FixedExtension from "./component/FixedExtension";
import { getAll } from "./api";

interface Extension {
  createdDate: string;
  extensionName: string;
  id: number;
  type: "fixed" | "custom";
}

const fixedExtensionsInitState = {
  bat: false,
  cmd: false,
  com: false,
  cpl: false,
  exe: false,
  scr: false,
  js: false,
};

function App() {
  const [fixedExtensions, setFixedExtensions] = useState<
    Record<string, boolean>
  >(fixedExtensionsInitState);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [customExtensions, setCustomExtensions] = useState([] as string[]);
  const [errorInfo, setErrorInfo] = useState({ title: "", message: "" });

  const openErrorModalWithInfo = useCallback(
    (title: string, message: string) => {
      setErrorInfo({ title, message });
      onOpen();
    },
    [onOpen]
  );

  const { data, isLoading } = useQuery<Extension[]>("todo", getAll);

  useEffect(() => {
    if (!data) return;
    if (data.length === 0) return;

    const existedFixedList = data
      .filter((one) => one.type === "fixed")
      .map((one) => one.extensionName);

    const newFixedExtensions = existedFixedList.reduce(
      (obj, one) => Object.assign(obj, { [one]: true }),
      fixedExtensions
    );

    const customList = data
      .filter((one) => one.type === "custom")
      .map((one) => one.extensionName);

    setFixedExtensions(newFixedExtensions);
    setCustomExtensions(customList);
  }, [data, fixedExtensions]);

  if (isLoading) return null;

  return (
    <div>
      <Container width="xxl">
        <FixedExtension
          fixedExtensionList={fixedExtensions}
          errorCallback={openErrorModalWithInfo}
        />
        <CustomExtension
          fixedExtensions={fixedExtensions}
          customExtensionList={customExtensions}
          errorCallback={openErrorModalWithInfo}
        />
      </Container>
      <ErrorModal isOpen={isOpen} errorInfo={errorInfo} onClose={onClose} />
    </div>
  );
}

export default App;
