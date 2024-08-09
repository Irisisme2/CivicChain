import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from 'components/card/Card.js';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Lokalizator moment
const localizer = momentLocalizer(moment);

// Przykładowe dane
const events = [
  {
    title: 'Election Day',
    start: new Date(moment().add(1, 'days').startOf('day')),
    end: new Date(moment().add(1, 'days').endOf('day')),
    description: 'Local election day for community voting.',
  },
  {
    title: 'Referendum Vote',
    start: new Date(moment().add(3, 'days').startOf('day')),
    end: new Date(moment().add(3, 'days').endOf('day')),
    description: 'Referendum on new city regulations.',
  },
  {
    title: 'Annual General Meeting',
    start: new Date(moment().add(7, 'days').startOf('day')),
    end: new Date(moment().add(7, 'days').endOf('day')),
    description: 'AGM for the annual review and election of board members.',
  },
  {
    title: 'Special Referendum',
    start: new Date(moment().add(14, 'days').startOf('day')),
    end: new Date(moment().add(14, 'days').endOf('day')),
    description: 'Special referendum on environmental policy changes.',
  }
];

const UpcomingVotes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDetailsClick = (event) => {
    setSelectedEvent(event);
    onOpen();
  };

  return (
    <Card>
      <CardHeader>
        <Text fontSize="2xl" fontWeight="bold">Upcoming Votes</Text>
      </CardHeader>
      <CardBody>
        <Box p={4}>
          {/* Kalendarz */}
          <Box mb={6} p={4} borderWidth={1} borderRadius="md" borderColor="gray.200">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 900 }}
            />
          </Box>

          {/* Odliczania czasu */}
          <VStack spacing={4} align="stretch">
            {events.map((event, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="md" borderColor="gray.200" bg="gray.50">
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="lg" fontWeight="bold">{event.title}</Text>
                  <Badge colorScheme="blue">{moment(event.start).fromNow()}</Badge>
                </HStack>
                <Text fontSize="sm" color="gray.600">{event.description}</Text>
                <Divider my={2} />
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.500">
                    Starts: {moment(event.start).format('MMMM Do YYYY, h:mm:ss a')}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Ends: {moment(event.end).format('MMMM Do YYYY, h:mm:ss a')}
                  </Text>
                </HStack>
                <Button mt={2} colorScheme="teal" variant="outline" onClick={() => handleDetailsClick(event)}>
                  More Details
                </Button>
              </Box>
            ))}
          </VStack>
        </Box>
      </CardBody>
      <CardFooter>
        <Text fontSize="sm" color="gray.500">
          Keep track of upcoming votes and elections to stay informed about important events.
        </Text>
      </CardFooter>

      {/* Modal dla szczegółów wydarzenia */}
      {selectedEvent && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedEvent.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="md" fontWeight="bold">Description:</Text>
              <Text fontSize="sm" mb={4}>{selectedEvent.description}</Text>
              <Text fontSize="md" fontWeight="bold">Starts:</Text>
              <Text fontSize="sm">{moment(selectedEvent.start).format('MMMM Do YYYY, h:mm:ss a')}</Text>
              <Text fontSize="md" fontWeight="bold">Ends:</Text>
              <Text fontSize="sm">{moment(selectedEvent.end).format('MMMM Do YYYY, h:mm:ss a')}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default UpcomingVotes;
