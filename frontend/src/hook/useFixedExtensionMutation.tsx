import { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";

import { addFixedExtensionAPI, deleteFixedExtensionAPI } from "../api";

type FixedExtensionObject = Record<string, boolean>;

interface UseFixedExtensionProps {
  fixedExtensionList: FixedExtensionObject;
  errorCallback: (title: string, message: string) => void;
}

export default function useFixedExtension({
  fixedExtensionList,
  errorCallback,
}: UseFixedExtensionProps) {
  const [fixedExtensions, setFixedExtensions] =
    useState<FixedExtensionObject>(fixedExtensionList);

  useEffect(() => {
    setFixedExtensions(fixedExtensionList);
  }, [fixedExtensionList]);

  const handleError = useCallback(
    (error: any) => {
      const { errorMessage } = error.response.data;
      errorCallback("커스텀 확장자 변경 에러", errorMessage);
    },
    [errorCallback]
  );

  const handleAddFixedExtensionSuccess = useCallback(
    ({ data }: any) => {
      const { extensionName } = data;
      setFixedExtensions({
        ...fixedExtensions,
        [extensionName]: true,
      });
    },
    [fixedExtensions]
  );

  const handleDeleteFixedExtensionSuccess = useCallback(
    (_: null, deletedExtensionName: string) => {
      setFixedExtensions({
        ...fixedExtensions,
        [deletedExtensionName]: false,
      });
    },
    [fixedExtensions]
  );

  const { mutate: addFixedExtension } = useMutation(addFixedExtensionAPI, {
    onError: handleError,
    onSuccess: handleAddFixedExtensionSuccess,
  });

  const { mutate: deleteFixedExtension } = useMutation(
    deleteFixedExtensionAPI,
    {
      onError: handleError,
      onSuccess: handleDeleteFixedExtensionSuccess,
    }
  );

  return {
    fixedExtensions,
    addFixedExtension,
    deleteFixedExtension,
  };
}
