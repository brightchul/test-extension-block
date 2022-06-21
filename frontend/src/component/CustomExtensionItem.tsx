import { CloseButton, Flex, Text } from "@chakra-ui/react";

interface CustomExtensionItemProps {
  customExtension: string;
  onClick: (value: string) => void;
}

export default function CustomExtensionItem({
  customExtension,
  onClick,
}: CustomExtensionItemProps) {
  return (
    <Flex
      key={customExtension}
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
        {customExtension}
      </Text>
      <CloseButton size="sm" onClick={() => onClick(customExtension)} />
    </Flex>
  );
}
