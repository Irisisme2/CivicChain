import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Progress,
  Divider,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Badge,
  Select,
  Input,
  Button,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend, LineElement, PointElement, TimeSeriesScale } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import adapter
import { FaChartBar, FaRegCalendarAlt, FaFilter } from 'react-icons/fa';

// Rejestracja komponentów wykresu
ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend, LineElement, PointElement, TimeSeriesScale);

// Przykładowe dane projektów
const projects = [
  {
    id: 1,
    name: 'Community Park Renovation',
    category: 'Infrastructure',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    milestones: [
      { name: 'Design Complete', date: '2024-01-15', completed: true },
      { name: 'Groundbreaking', date: '2024-03-01', completed: true },
      { name: 'Construction Start', date: '2024-04-01', completed: false },
      { name: 'Project Completion', date: '2024-12-31', completed: false },
    ],
    progress: 40, // w procentach
    priority: 'High',
  },
  {
    id: 2,
    name: 'Tech Skills Training',
    category: 'Education',
    startDate: '2024-02-01',
    endDate: '2024-12-15',
    milestones: [
      { name: 'Curriculum Development', date: '2024-02-01', completed: true },
      { name: 'Instructor Hiring', date: '2024-04-15', completed: true },
      { name: 'Course Launch', date: '2024-06-01', completed: false },
      { name: 'First Evaluation', date: '2024-12-15', completed: false },
    ],
    progress: 20, // w procentach
    priority: 'Medium',
  },
];

// Przykładowe dane do wykresu
const generateProgressData = (projects) => ({
  labels: projects.map((p) => p.name),
  datasets: [
    {
      label: 'Project Progress',
      data: projects.map((p) => p.progress),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
});

const generateMilestoneData = (project) => ({
  labels: project.milestones.map((m) => m.name),
  datasets: [
    {
      label: 'Milestones',
      data: project.milestones.map((m, index) => ({
        x: new Date(m.date),
        y: index,
        label: m.name,
        completed: m.completed,
      })),
      backgroundColor: project.milestones.map((m) =>
        m.completed ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)'
      ),
      borderColor: project.milestones.map((m) =>
        m.completed ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
      ),
      borderWidth: 1,
    },
  ],
});

const progressOptions = {
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
          return `${label}: ${value}%`;
        },
      },
    },
  },
};

const milestoneOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const { label, completed } = context.raw;
          return `${label}: ${completed ? 'Completed' : 'Not Completed'}`;
        },
      },
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'month',
        tooltipFormat: 'll',
      },
    },
    y: {
      ticks: {
        callback: function (value, index, values) {
          return `${index + 1}`;
        },
      },
    },
  },
};

const ProjectStatus = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('teal.600', 'teal.700');
  const milestoneBoxBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('progress');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterProjects(e.target.value, sortCriteria, selectedCategory);
  };

  const handleSort = (e) => {
    setSortCriteria(e.target.value);
    filterProjects(searchTerm, e.target.value, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    filterProjects(searchTerm, sortCriteria, e.target.value);
  };

  const filterProjects = (searchTerm, sortCriteria, category) => {
    const sortedProjects = projects
      .filter((p) =>
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
        (category === 'All' || p.category === category)
      )
      .sort((a, b) => {
        if (sortCriteria === 'progress') {
          return b.progress - a.progress;
        } else if (sortCriteria === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
    setFilteredProjects(sortedProjects);
  };

  const totalProgress = filteredProjects.reduce((acc, project) => acc + project.progress, 0) / filteredProjects.length || 0;

  return (
    <Card boxShadow="lg" borderRadius="md" p={6} bg={cardBg} borderWidth="1px">
      <CardHeader bg={headerBg} color="white" borderTopRadius="md" p={4}>
        <Text fontSize="2xl" fontWeight="bold">Project Status Dashboard</Text>
      </CardHeader>

      <CardBody>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Summary</Tab>
            <Tab>Details</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack spacing={6}>
                <HStack spacing={4} mb={6}>
                  <Input
                    placeholder="Search by project name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    variant="outline"
                    size="sm"
                    width="250px"
                  />
                  <Select
                    placeholder="Filter by category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    size="sm"
                  >
                    <option value="All">All Categories</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                  </Select>
                  <Select
                    placeholder="Sort by"
                    value={sortCriteria}
                    onChange={handleSort}
                    size="sm"
                  >
                    <option value="progress">Progress</option>
                    <option value="name">Name</option>
                  </Select>
                </HStack>

                <Text fontSize="lg" fontWeight="bold">Total Average Progress: {totalProgress.toFixed(2)}%</Text>
                <Bar data={generateProgressData(filteredProjects)} options={progressOptions} />
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing={6}>
                {filteredProjects.map((project) => (
                  <Box key={project.id} p={4} borderWidth="1px" borderRadius="md" bg={milestoneBoxBg} boxShadow="md">
                    <Text fontSize="xl" fontWeight="bold">{project.name}</Text>
                    <Text fontSize="lg" color={textColor}>Category: {project.category}</Text>
                    <Text fontSize="lg" color={textColor}>Priority: <Badge colorScheme="teal">{project.priority}</Badge></Text>
                    <Text fontSize="lg" color={textColor}>Start Date: {new Date(project.startDate).toLocaleDateString()}</Text>
                    <Text fontSize="lg" color={textColor}>End Date: {new Date(project.endDate).toLocaleDateString()}</Text>
                    <Divider my={4} />
                    <Text fontSize="lg" fontWeight="bold">Milestones</Text>
                    <Line data={generateMilestoneData(project)} options={milestoneOptions} />
                  </Box>
                ))}
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>

      <CardFooter bg={headerBg} color="white" borderBottomRadius="md" p={4}>
        <Text fontSize="sm">Track and visualize project progress and milestones.</Text>
      </CardFooter>
    </Card>
  );
};

export default ProjectStatus;

