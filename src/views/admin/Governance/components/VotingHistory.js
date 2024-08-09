import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Tooltip,
  Collapse,
  useDisclosure,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from '@chakra-ui/react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { FiInfo, FiSearch } from 'react-icons/fi';
import 'chart.js/auto';

// Rejestracja komponentów wykresu
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

// Przykładowe dane do historii głosowań
const votingHistory = [
  {
    date: '2024-08-01',
    election: 'City Council Election',
    option: 'Candidate A',
    outcome: 'Won',
    details: 'Candidate A won with a majority vote in the City Council election. The turnout was high with significant support from the community.',
  },
  {
    date: '2024-07-15',
    election: 'Local Referendum',
    option: 'Yes',
    outcome: 'Passed',
    details: 'The referendum on local infrastructure development passed successfully. This will fund several new projects in the city.',
  },
  {
    date: '2024-06-30',
    election: 'School Board Election',
    option: 'Candidate B',
    outcome: 'Lost',
    details: 'Candidate B lost in the School Board election. The winning candidate has promised to address key issues raised during the campaign.',
  },
  {
    date: '2024-06-01',
    election: 'Statewide Measure',
    option: 'No',
    outcome: 'Rejected',
    details: 'The statewide measure on environmental regulations was rejected. The debate will continue with revised proposals in the future.',
  },
];

// Przykładowe dane do wykresu
const data = {
  labels: votingHistory.map(entry => entry.date),
  datasets: [
    {
      label: 'Participation',
      data: votingHistory.map(() => 1), // każda data to 1 głos
      borderColor: 'rgba(76, 175, 80, 1)',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      borderWidth: 2,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || '';
          const value = context.raw;
          return `${label}: ${value} vote(s)`;
        },
      },
    },
  },
};

const VotingHistory = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedChart, setSelectedChart] = useState('line');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElection, setSelectedElection] = useState('All');
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();

  const handleShowDetails = (event) => {
    setSelectedEvent(event);
    onOpen();
  };

  const filteredHistory = votingHistory.filter(entry =>
    (entry.election.includes(searchTerm) || searchTerm === '') &&
    (selectedElection === 'All' || entry.election === selectedElection)
  );

  return (
    <Card boxShadow="md" borderRadius="lg">
      <CardHeader bg="teal.500" color="white" borderTopRadius="lg">
        <Text fontSize="2xl" fontWeight="bold">Voting History</Text>
      </CardHeader>
      <CardBody>
        <Box p={4} borderRadius="md" bg="gray.50">
          {/* Filtrowanie */}
          <HStack spacing={4} mb={6}>
            <Input
              placeholder="Search by election..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outline"
              size="sm"
            />
            <Select
              placeholder="Filter by election"
              value={selectedElection}
              onChange={(e) => setSelectedElection(e.target.value)}
              size="sm"
            >
              <option value="All">All</option>
              <option value="City Council Election">City Council Election</option>
              <option value="Local Referendum">Local Referendum</option>
              <option value="School Board Election">School Board Election</option>
              <option value="Statewide Measure">Statewide Measure</option>
            </Select>
          </HStack>

          {/* Tabela historii głosowań */}
          <Box mb={6}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>Personal Voting Record</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Election</Th>
                  <Th>Option Voted For</Th>
                  <Th>Outcome</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredHistory.map((entry, index) => (
                  <Tr key={index}>
                    <Td>{entry.date}</Td>
                    <Td>{entry.election}</Td>
                    <Td>{entry.option}</Td>
                    <Td>
                      <Badge colorScheme={entry.outcome === 'Won' ? 'green' : entry.outcome === 'Passed' ? 'blue' : 'red'}>
                        {entry.outcome}
                      </Badge>
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="More details"
                        icon={<FiInfo />}
                        colorScheme="teal"
                        size="sm"
                        onClick={() => handleShowDetails(entry)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Wykres */}
          <Box mt={6} p={4} borderRadius="md" bg="white" borderWidth={1} borderColor="gray.200" boxShadow="md">
            <Text fontSize="lg" fontWeight="bold" mb={4}>Voting Trends Over Time</Text>
            <HStack spacing={4} mb={4}>
              <Button colorScheme="teal" onClick={() => setSelectedChart('line')}>Line Chart</Button>
              <Button colorScheme="teal" onClick={() => setSelectedChart('bar')}>Bar Chart</Button>
            </HStack>
            {selectedChart === 'line' && (
              <Line data={data} options={options} height={200} width={400} />
            )}
            {selectedChart === 'bar' && (
              <Bar data={data} options={options} height={200} width={400} />
            )}
          </Box>

          {/* Toggle More Details */}
          <HStack mt={6} justify="space-between">
            <Tooltip label={expanded ? "Show less details" : "Show more details"} aria-label="Toggle details">
              <Button colorScheme="teal" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Show Less" : "Show More"}
              </Button>
            </Tooltip>
          </HStack>
          <Collapse in={expanded}>
            <Box mt={4} p={4} borderWidth={1} borderRadius="md" borderColor="gray.200" bg="gray.50">
              <Text fontSize="sm" color="gray.600">
                This section provides detailed insights into your voting behavior, including frequency of participation, trends over different periods, and more. It helps you understand your engagement with the voting process and identify patterns in your voting history.
              </Text>
            </Box>
          </Collapse>
        </Box>
      </CardBody>
      <CardFooter bg="teal.500" color="white" borderBottomRadius="lg">
        <Text fontSize="sm">
          Review and analyze your voting history to track your participation and trends over time.
        </Text>
      </CardFooter>

      {/* Modal with Event Details */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedEvent?.election}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" fontWeight="bold">Date:</Text>
            <Text fontSize="md" color="gray.600" mb={4}>{selectedEvent?.date}</Text>
            <Text fontSize="lg" fontWeight="bold">Option Voted For:</Text>
            <Text fontSize="md" color="gray.600" mb={4}>{selectedEvent?.option}</Text>
            <Text fontSize="lg" fontWeight="bold">Outcome:</Text>
            <Badge colorScheme={selectedEvent?.outcome === 'Won' ? 'green' : selectedEvent?.outcome === 'Passed' ? 'blue' : 'red'}>{selectedEvent?.outcome}</Badge>
            <Text fontSize="lg" fontWeight="bold" mt={4}>Details:</Text>
            <Text fontSize="md" color="gray.600" mt={2}>{selectedEvent?.details}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default VotingHistory;
