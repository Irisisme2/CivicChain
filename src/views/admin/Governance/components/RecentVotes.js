import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Divider,
  Collapse,
  Tooltip,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from 'components/card/Card.js';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend, LineElement } from 'chart.js';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// Rejestracja komponentów wykresu
ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend, LineElement);

// Przykładowe dane
const voteResults = [
  {
    title: 'Referendum on City Regulations',
    result: 'Passed',
    participationRate: 85,
    votes: {
      yes: 1200,
      no: 200,
    },
    details: 'This referendum aimed at changing the city regulations regarding zoning laws and public safety. The proposal was accepted with a majority vote.',
  },
  {
    title: 'School Board Election',
    result: 'Rejected',
    participationRate: 78,
    votes: {
      yes: 950,
      no: 450,
    },
    details: 'The election was held to choose new members for the school board. Despite a good turnout, the proposed candidates were not favored by the majority.',
  },
  {
    title: 'New Environmental Policy',
    result: 'Passed',
    participationRate: 90,
    votes: {
      yes: 1400,
      no: 150,
    },
    details: 'This policy introduces new measures for reducing pollution and promoting green energy. It received strong support from the community.',
  },
];

// Przykładowe dane do wykresu słupkowego
const dataBar = {
  labels: voteResults.map(vote => vote.title),
  datasets: [
    {
      label: 'Yes Votes',
      data: voteResults.map(vote => vote.votes.yes),
      backgroundColor: 'rgba(76, 175, 80, 0.6)',
      borderColor: 'rgba(76, 175, 80, 1)',
      borderWidth: 1,
    },
    {
      label: 'No Votes',
      data: voteResults.map(vote => vote.votes.no),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const dataLine = {
  labels: voteResults.map(vote => vote.title),
  datasets: [
    {
      label: 'Yes Votes',
      data: voteResults.map(vote => vote.votes.yes),
      borderColor: 'rgba(76, 175, 80, 1)',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      borderWidth: 2,
      fill: true,
    },
    {
      label: 'No Votes',
      data: voteResults.map(vote => vote.votes.no),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
      labels: {
        color: '#333',
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || '';
          const value = context.raw;
          return `${label}: ${value}`;
        },
      },
    },
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
  },
};

const RecentVotes = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVote, setSelectedVote] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleMoreDetails = (vote) => {
    setSelectedVote(vote);
    onOpen();
  };

  return (
    <>
      <Card boxShadow="md" borderRadius="lg">
        <CardHeader bg="teal.500" color="white" borderTopRadius="lg">
          <Text fontSize="2xl" fontWeight="bold">Recent Votes</Text>
        </CardHeader>
        <CardBody>
          <Box p={4} borderRadius="md" bg="gray.50">
            {/* Wyniki głosowań */}
            <VStack spacing={4} align="stretch">
              {voteResults.map((vote, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                  borderColor="gray.200"
                  bg="white"
                  shadow="md"
                  transition="all 0.2s"
                  _hover={{ shadow: 'lg' }}
                >
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="lg" fontWeight="bold">{vote.title}</Text>
                    <Badge colorScheme={vote.result === 'Passed' ? 'green' : 'red'}>
                      {vote.result}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.600">Participation Rate: {vote.participationRate}%</Text>
                  <HStack spacing={4} mt={2}>
                    <Text fontSize="sm" color="gray.500">Yes Votes: {vote.votes.yes}</Text>
                    <Text fontSize="sm" color="gray.500">No Votes: {vote.votes.no}</Text>
                  </HStack>
                  <HStack mt={4} justify="space-between">
                    <Tooltip label="Click for more details" aria-label="Vote Details">
                      <Button colorScheme="teal" variant="outline" onClick={() => handleMoreDetails(vote)}>More Details</Button>
                    </Tooltip>
                    <IconButton
                      aria-label={expandedIndex === index ? "Collapse vote details" : "Expand vote details"}
                      icon={expandedIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                      onClick={() => handleToggle(index)}
                    />
                  </HStack>
                  <Collapse in={expandedIndex === index}>
                    <Box mt={4} p={4} borderWidth={1} borderRadius="md" borderColor="gray.300" bg="gray.100">
                      <Text fontSize="sm" color="gray.600">{vote.details}</Text>
                    </Box>
                  </Collapse>
                </Box>
              ))}
            </VStack>

            {/* Wykres słupkowy / liniowy */}
            <Box mt={6} p={4} borderRadius="md" bg="white" borderWidth={1} borderColor="gray.200" boxShadow="md">
              <Text fontSize="lg" fontWeight="bold" mb={4}>Vote Distribution</Text>
              <HStack spacing={4} mb={4}>
                <Button colorScheme="teal" onClick={() => setChartType('bar')} size="sm">Bar Chart</Button>
                <Button colorScheme="teal" onClick={() => setChartType('line')} size="sm">Line Chart</Button>
              </HStack>
              {chartType === 'bar' && (
                <Box height={640} width="100%">
                  <Bar data={dataBar} options={options} />
                </Box>
              )}
              {chartType === 'line' && (
                <Box height={640} width="100%">
                  <Line data={dataLine} options={options} />
                </Box>
              )}
            </Box>
          </Box>
        </CardBody>
        <CardFooter bg="teal.500" color="white" borderBottomRadius="lg">
          <Text fontSize="sm">
            Visualize and review the outcomes of recent votes and track the distribution of votes.
          </Text>
        </CardFooter>
      </Card>

      {/* Modal dla szczegółów głosowań */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vote Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedVote && (
              <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="bold">{selectedVote.title}</Text>
                <Text fontSize="md">Result: {selectedVote.result}</Text>
                <Text fontSize="md">Participation Rate: {selectedVote.participationRate}%</Text>
                <Text fontSize="md">Yes Votes: {selectedVote.votes.yes}</Text>
                <Text fontSize="md">No Votes: {selectedVote.votes.no}</Text>
                <Text fontSize="md" color="gray.600">{selectedVote.details}</Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecentVotes;
