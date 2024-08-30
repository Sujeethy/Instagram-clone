import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  VStack,
} from '@chakra-ui/react';
import uploadImageAndGetUrl from '../../hooks/useAddStatus';
import useAuthStore from '../../store/authStore'; // Import the store

const AddStatusModal = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null)
  const authUser = useAuthStore(state => state.user); // Access the user state here

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
        setSelectedImageFile(file);

        // Display the selected image in the preview
        const reader = new FileReader();
       
        reader.onloadend = () => setSelectedImage(reader.result);
        reader.readAsDataURL(file);
      }
      
  };

  const handleSubmit = async () => {
    try {
      await uploadImageAndGetUrl(selectedImageFile, authUser); // Pass user data here
      
      setSelectedImage(null);
      setSelectedImageFile(null)
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Error adding status:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Status</ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Upload Image</FormLabel>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </FormControl>
            {selectedImage && (
              <Box position="relative" width="full" height="2xl" bg="black" borderRadius="5px" overflow="hidden">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Box>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!selectedImage}>
            Add Status
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddStatusModal;
