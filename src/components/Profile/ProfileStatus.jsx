import React, { useEffect, useState } from 'react';
import { Box, Image, Modal, ModalOverlay, ModalContent, ModalBody, Progress } from '@chakra-ui/react';

const StatusPopup = ({ isOpen, onClose, images, interval = 3000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let imageTimer;
    let progressTimer;

    if (isOpen) {
      imageTimer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setElapsedTime(0); // Reset elapsed time when the image changes
      }, interval);

      progressTimer = setInterval(() => {
        setElapsedTime((prevTime) => {
          const newTime = prevTime + 100; // Increment elapsed time by 100ms
          if (newTime >= interval) {
            return interval; // Cap elapsed time to the interval
          }
          return newTime;
        });
      }, 100); // Update progress every 100ms

      return () => {
        clearInterval(imageTimer);
        clearInterval(progressTimer);
      };
    }
  }, [isOpen, images.length, interval]);

  const progressValue = (elapsedTime / interval) * 100;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        {/* White Top Line */}
        <Progress 
          value={progressValue} 
          size="xs" 
          colorScheme="messenger" 
          bg="transparent" 
          m="5px"
        />

        {/* Image Display */}
        <ModalBody p={0}>
          <Box position="relative" width="" height="auto" borderRadius="5px" overflow="hidden">
            <Image
              src={images[currentImageIndex]}
              alt={`Status ${currentImageIndex + 1}`}
              width="100%"
              height="auto"
              objectFit="cover"
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StatusPopup;
