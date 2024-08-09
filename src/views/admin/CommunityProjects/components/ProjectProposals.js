import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  Input,
  Pagination,
  Stack,
  Tag,
  Divider,
} from '@chakra-ui/react';
import { format } from 'date-fns';

// Przykładowe dane propozycji projektów
const proposals = [
  {
    id: 1,
    name: 'Urban Green Space Development',
    description: 'Creating more green spaces in urban areas to improve air quality and provide recreational areas.',
    fundingGoal: 75000,
    submissionDate: '2024-07-15',
    status: 'Under Review',
  },
  {
    id: 2,
    name: 'Renewable Energy Initiative',
    description: 'Implementing renewable energy solutions in local communities to reduce carbon footprint and energy costs.',
    fundingGoal: 120000,
    submissionDate: '2024-08-05',
    status: 'Approved',
  },
  {
    id: 3,
    name: 'Local Library Expansion',
    description: 'Expanding the local library to include more books, digital resources, and community meeting spaces.',
    fundingGoal: 50000,
    submissionDate: '2024-06-20',
    status: 'Rejected',
  },
  {
    id: 4,
    name: 'Community Health Outreach Program',
    description: 'A program aimed at improving community health through outreach activities, workshops, and health screenings.',
    fundingGoal: 60000,
    submissionDate: '2024-08-15',
    status: 'Approved',
  },
  {
    id: 5,
    name: 'Tech Skills Training for Youth',
    description: 'Providing technology skills training for young people to enhance their career prospects and digital literacy.',
    fundingGoal: 45000,
    submissionDate: '2024-09-01',
    status: 'Under Review',
  },
];

const statusColors = {
  'Under Review': 'yellow',
  'Approved': 'green',
  'Rejected': 'red',
};

const ProjectProposals = () => {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('submissionDate');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleShowDetails = (proposal) => {
    setSelectedProposal(proposal);
    onOpen();
  };

  const sortedProposals = [...proposals].sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === 'fundingGoal') {
      return b.fundingGoal - a.fundingGoal;
    } else if (sortCriteria === 'submissionDate') {
      return new Date(b.submissionDate) - new Date(a.submissionDate);
    }
    return 0;
  });

  const filteredProposals = sortedProposals.filter(proposal =>
    (proposal.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
    (filterStatus === 'All' || proposal.status === filterStatus)
  );

  const paginatedProposals = filteredProposals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid date' : format(date, 'MMM dd, yyyy');
  };

  return (
    <Card boxShadow="lg" borderRadius="md" p={6} bg="white" borderWidth="1px">
      <CardHeader bg="teal.600" color="white" borderTopRadius="md" p={4}>
        <Text fontSize="2xl" fontWeight="bold">Project Proposals</Text>
      </CardHeader>

      <CardBody>
        <Stack spacing={4} mb={6}>
          <HStack spacing={4} justify="space-between">
            <Input
              placeholder="Search by project name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outline"
              size="md"
            />
            <Select
              placeholder="Filter by status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              size="md"
            >
              <option value="All">All</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </Select>
            <Select
              placeholder="Sort by"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              size="md"
            >
              <option value="name">Name</option>
              <option value="fundingGoal">Funding Goal</option>
              <option value="submissionDate">Submission Date</option>
            </Select>
          </HStack>

          <Table variant="striped" colorScheme="teal" size="md">
            <Thead>
              <Tr>
                <Th>Project Name</Th>
                <Th>Description</Th>
                <Th>Funding Goal</Th>
                <Th>Submission Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedProposals.map((proposal) => (
                <Tr key={proposal.id} onClick={() => handleShowDetails(proposal)} cursor="pointer" _hover={{ bg: 'gray.100' }}>
                  <Td>{proposal.name}</Td>
                  <Td>{proposal.description}</Td>
                  <Td>${proposal.fundingGoal.toLocaleString()}</Td>
                  <Td>{formatDate(proposal.submissionDate)}</Td>
                  <Td>
                    <Badge colorScheme={statusColors[proposal.status]}>
                      {proposal.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Paginacja */}
          <HStack mt={4} spacing={4} justify="center">
            <Button
              onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
              isDisabled={currentPage === 1}
              colorScheme="teal"
            >
              Previous
            </Button>
            <Text>{`Page ${currentPage} of ${Math.ceil(filteredProposals.length / itemsPerPage)}`}</Text>
            <Button
              onClick={() => setCurrentPage(page => Math.min(page + 1, Math.ceil(filteredProposals.length / itemsPerPage)))}
              isDisabled={currentPage === Math.ceil(filteredProposals.length / itemsPerPage)}
              colorScheme="teal"
            >
              Next
            </Button>
          </HStack>
        </Stack>
      </CardBody>

      <CardFooter bg="teal.600" color="white" borderBottomRadius="md" p={4}>
        <Text fontSize="sm">Review and track the status of project proposals.</Text>
      </CardFooter>

      {/* Modal with Proposal Details */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProposal?.name} - Proposal Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" fontWeight="bold">Description:</Text>
            <Text fontSize="md" color="gray.600" mb={4}>{selectedProposal?.description}</Text>
            <Divider my={4} />
            <Text fontSize="lg" fontWeight="bold">Funding Goal:</Text>
            <Text fontSize="md" color="gray.600" mb={4}>${selectedProposal?.fundingGoal.toLocaleString()}</Text>
            <Text fontSize="lg" fontWeight="bold">Submission Date:</Text>
            <Text fontSize="md" color="gray.600" mb={4}>{formatDate(selectedProposal?.submissionDate)}</Text>
            <Text fontSize="lg" fontWeight="bold">Status:</Text>
            <Tag colorScheme={statusColors[selectedProposal?.status]}>{selectedProposal?.status}</Tag>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ProjectProposals;

