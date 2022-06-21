import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface ErrorModalProps {
  isOpen: boolean;
  errorInfo: { title: string; message: string };
  onClose: () => void;
}

export default function ErrorModal({
  isOpen,
  errorInfo,
  onClose,
}: ErrorModalProps) {
  return (
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
  );
}
