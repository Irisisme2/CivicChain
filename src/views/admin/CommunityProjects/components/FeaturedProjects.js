import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Progress,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend, ArcElement } from 'chart.js';
import { FiInfo } from 'react-icons/fi';
import 'chart.js/auto';

// Rejestracja komponentów wykresu
ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend, ArcElement);

// Przykładowe dane projektów
const projects = [
  {
    id: 1,
    name: 'Community Park Revitalization',
    fundingGoal: 50000,
    progress: 20000,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    status: 'In Progress',
    impact: {
      "Trees Planted": 150,
      "Playgrounds Created": 5,
      "Community Events": 10,
    },
    details: 'Revitalizing community parks to create better recreational spaces for families and children.'
  },
  {
    id: 2,
    name: 'Local School Technology Upgrade',
    fundingGoal: 30000,
    progress: 15000,
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    status: 'Completed',
    impact: {
      "Computers Upgraded": 30,
      "Classes Enhanced": 12,
      "Students Benefited": 500,
    },
    details: 'Upgrading technology in local schools to enhance learning environments and digital skills.'
  },
  {
    id: 3,
    name: 'Neighborhood Clean-Up Initiative',
    fundingGoal: 20000,
    progress: 12000,
    startDate: '2024-06-01',
    endDate: '2024-11-30',
    status: 'In Progress',
    impact: {
      "Trash Collected (kg)": 1000,
      "Volunteer Hours": 200,
      "Clean-Up Events": 8,
    },
    details: 'Organizing clean-up drives to improve neighborhood cleanliness and promote community involvement.'
  },
];

// Przykładowe dane do wykresu
const generateImpactData = (impact) => ({
  labels: Object.keys(impact),
  datasets: [
    {
      label: 'Impact Metrics',
      data: Object.values(impact),
      backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(153, 102, 255, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)'],
      borderWidth: 1,
    },
  ],
});

const impactOptions = {
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
          return `${label}: ${value}`;
        },
      },
    },
  },
};

const FeaturedProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [chartType, setChartType] = useState('pie');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('name');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleShowDetails = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  const sortedProjects = projects.slice().sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === 'progress') {
      return b.progress - a.progress;
    } else if (sortCriteria === 'fundingGoal') {
      return b.fundingGoal - a.fundingGoal;
    } else if (sortCriteria === 'startDate') {
      return new Date(a.startDate) - new Date(b.startDate);
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter(project =>
    (project.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
    (filterStatus === 'All' || project.status === filterStatus)
  );

  return (
    <Card boxShadow="md" borderRadius="lg" p={4}>
      <CardHeader bg="teal.500" color="white" borderTopRadius="lg">
        <Text fontSize="2xl" fontWeight="bold">Featured Projects</Text>
      </CardHeader>

      <CardBody>
        {/* Filtrowanie */}
        <HStack spacing={4} mb={6}>
          <Input
            placeholder="Search by project name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outline"
            size="sm"
          />
          <Select
            placeholder="Filter by status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="sm"
          >
            <option value="All">All</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>
          <Select
            placeholder="Sort by"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            size="sm"
          >
            <option value="name">Name</option>
            <option value="progress">Progress</option>
            <option value="fundingGoal">Funding Goal</option>
            <option value="startDate">Start Date</option>
          </Select>
        </HStack>

        <VStack spacing={6} align="stretch">
          {filteredProjects.map((project) => (
            <Box
              key={project.id}
              mb={4}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              width="100%"
            >
              <Text fontSize="xl" fontWeight="bold">{project.name}</Text>
              <Text fontSize="lg" fontWeight="bold" mt={2}>Funding Goal: ${project.fundingGoal.toLocaleString()}</Text>
              <Text fontSize="lg" mt={2}>Progress: ${project.progress.toLocaleString()}</Text>
              <Text fontSize="lg" mt={2}>Status: {project.status}</Text>
              <Progress value={(project.progress / project.fundingGoal) * 100} size="sm" colorScheme="teal" mt={2} mb={4} />
              <HStack spacing={4}>
                <Button colorScheme="teal" onClick={() => handleShowDetails(project)}>View Impact Metrics</Button>
                <Tooltip label="More details" aria-label="More details">
                  <IconButton
                    aria-label="More details"
                    icon={<FiInfo />}
                    colorScheme="teal"
                    size="sm"
                    onClick={() => handleShowDetails(project)}
                  />
                </Tooltip>
              </HStack>
            </Box>
          ))}
        </VStack>
      </CardBody>

      <CardFooter bg="teal.500" color="white" borderBottomRadius="lg">
        <Text fontSize="sm">Track and analyze featured projects' progress and impact.</Text>
      </CardFooter>

      {/* Modal with Project Impact Metrics */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProject?.name} - Impact Metrics</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" fontWeight="bold">Funding Goal:</Text>
            <Text fontSize="md" color="gray.600" mb={4}>${selectedProject?.fundingGoal.toLocaleString()}</Text>
            <Text fontSize="lg" fontWeight="bold">Progress:</Text>
            <Text fontSize="md" color="gray.600" mb={4}>${selectedProject?.progress.toLocaleString()}</Text>
            <Text fontSize="lg" fontWeight="bold">Project Details:</Text>
            <Text fontSize="md" color="gray.600" mb={4}>{selectedProject?.details}</Text>
            <Text fontSize="lg" fontWeight="bold" mb={4}>Impact Metrics:</Text>
            {selectedProject && (
              <Box>
                <HStack spacing={4} mb={4}>
                  <Button colorScheme="teal" onClick={() => setChartType('pie')}>Pie Chart</Button>
                  <Button colorScheme="teal" onClick={() => setChartType('bar')}>Bar Chart</Button>
                </HStack>
                {chartType === 'pie' ? (
                  <Pie data={generateImpactData(selectedProject.impact)} options={impactOptions} />
                ) : (
                  <Bar data={generateImpactData(selectedProject.impact)} options={impactOptions} />
                )}
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default FeaturedProjects;
