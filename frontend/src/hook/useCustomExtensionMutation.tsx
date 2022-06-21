import { useEffect, useState } from "react";
import { useMutation } from "react-query";

import { addCustomExtensionAPI, deleteCustomExtensionAPI } from "../api";

interface UseCustomExtensionMutationProps {
  customExtensionList: string[];
  errorCallback: (title: string, message: string) => void;
}

export default function useCustomExtensionMutation({
  customExtensionList,
  errorCallback,
}: UseCustomExtensionMutationProps) {
  const [customExtensions, setCustomExtensions] = useState(customExtensionList);

  useEffect(() => {
    setCustomExtensions(customExtensionList);
  }, [customExtensionList]);

  const { mutate: addCustomExtension, isSuccess: isAddSuccess } = useMutation(
    addCustomExtensionAPI,
    {
      onError: (error: any) => {
        const { errorMessage } = error.response.data;
        errorCallback("커스텀 확장자 추가 에러", errorMessage);
      },
      onSuccess: ({ data }) => {
        const { extensionName } = data;
        setCustomExtensions([...customExtensions, extensionName]);
      },
    }
  );

  const { mutate: deleteCustomExtension, isSuccess: isDeleteSuccess } =
    useMutation(deleteCustomExtensionAPI, {
      onError: (error: any) => {
        const { errorMessage } = error.response.data;
        errorCallback("커스텀 확장자 추가 에러", errorMessage);
      },
      onSuccess: (_, deletedExtensionName: string) => {
        setCustomExtensions(
          customExtensions.filter((ext) => ext !== deletedExtensionName)
        );
      },
    });

  return {
    isAddSuccess,
    isDeleteSuccess,
    customExtensions,
    addCustomExtension,
    deleteCustomExtension,
  };
}
