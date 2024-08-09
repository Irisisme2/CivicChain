import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Progress,
  Button,
  Link,
  Grid,
  Badge,
  Tooltip,
  Input,
  Select,
  Collapse,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "components/card/Card.js";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const ActiveProjects = () => {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { isOpen, onToggle } = useDisclosure();

  // Example data for projects
  const projects = [
    {
      name: "Decentralized Voting System",
      status: "Funding",
      progress: 65,
      keyMetrics: {
        contributors: 150,
        target: "$50,000",
        raised: "$32,500",
        completionDate: "2024-12-31",
        lastUpdate: "2024-08-05",
        budgetUtilization: 65,
        estimatedCompletion: "3 months",
      },
    },
    {
      name: "SocialFi Integration",
      status: "In Development",
      progress: 80,
      keyMetrics: {
        contributors: 200,
        target: "$75,000",
        raised: "$60,000",
        completionDate: "2025-01-15",
        lastUpdate: "2024-07-20",
        budgetUtilization: 80,
        estimatedCompletion: "4 months",
      },
    },
    {
      name: "Cross-Chain DeFi Platform",
      status: "Funding",
      progress: 45,
      keyMetrics: {
        contributors: 120,
        target: "$150,000",
        raised: "$67,500",
        completionDate: "2024-11-30",
        lastUpdate: "2024-08-01",
        budgetUtilization: 45,
        estimatedCompletion: "5 months",
      },
    },
    {
      name: "Blockchain Charity Initiative",
      status: "In Development",
      progress: 70,
      keyMetrics: {
        contributors: 180,
        target: "$40,000",
        raised: "$28,000",
        completionDate: "2024-09-15",
        lastUpdate: "2024-07-30",
        budgetUtilization: 70,
        estimatedCompletion: "2 months",
      },
    },
    // More projects can be added here
  ];

  // Filter and search functionality
  const filteredProjects = projects.filter(project =>
    (project.name.toLowerCase().includes(search.toLowerCase()) || search === "") &&
    (selectedStatus === "All" || project.status === selectedStatus)
  );

  const data = {
    labels: filteredProjects.map(project => project.name),
    datasets: [
      {
        label: "Funding Progress",
        data: filteredProjects.map(project => project.progress),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
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
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <Text fontSize="2xl" fontWeight="bold">Active Projects</Text>
      </CardHeader>
      <CardBody>
        <Box p={2}>
          {/* Search and Filter */}
          <HStack spacing={2} mb={6}>
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outline"
            />
            <Select
              placeholder="Filter by status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Funding">Funding</option>
              <option value="In Development">In Development</option>
              <option value="Completed">Completed</option>
            </Select>
          </HStack>
          
          <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }} gap={6}>
            {filteredProjects.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">{project.name}</Text>
                  <Badge colorScheme={project.status === "Funding" ? "yellow" : project.status === "In Development" ? "blue" : "green"}>
                    {project.status}
                  </Badge>
                </CardHeader>
                <CardBody>
                  <VStack spacing={2} align="stretch">
                    {/* Progress Bar */}
                    <Box>
                      <Text fontSize="sm" mb={2}>Funding Progress</Text>
                      <Progress value={project.progress} colorScheme="teal" size="md" hasStripe isAnimated />
                      <Text fontSize="sm" mt={1} textAlign="right">{project.progress}%</Text>
                    </Box>
                    
                    {/* Key Metrics */}
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <VStack spacing={1} align="start">
                        <Text fontSize="sm" color="gray.500">Contributors</Text>
                        <Text fontSize="md" fontWeight="semibold">{project.keyMetrics.contributors}</Text>
                      </VStack>
                      <VStack spacing={1} align="start">
                        <Text fontSize="sm" color="gray.500">Target</Text>
                        <Text fontSize="md" fontWeight="semibold">{project.keyMetrics.target}</Text>
                      </VStack>
                      <VStack spacing={1} align="start">
                        <Text fontSize="sm" color="gray.500">Raised</Text>
                        <Text fontSize="md" fontWeight="semibold">{project.keyMetrics.raised}</Text>
                      </VStack>
                      <VStack spacing={1} align="start">
                        <Text fontSize="sm" color="gray.500">Completion Date</Text>
                        <Text fontSize="md" fontWeight="semibold">{project.keyMetrics.completionDate}</Text>
                      </VStack>
                      <VStack spacing={1} align="start">
                        <Text fontSize="sm" color="gray.500">Last Update</Text>
                        <Text fontSize="md" fontWeight="semibold">{project.keyMetrics.lastUpdate}</Text>
                      </VStack>
                      <VStack spacing={1} align="start">
                        <Text fontSize="sm" color="gray.500">Budget Utilization</Text>
                        <Text fontSize="md" fontWeight="semibold">{project.keyMetrics.budgetUtilization}%</Text>
                      </VStack>
                      <VStack spacing={1} align="start">
                        <Text fontSize="sm" color="gray.500">Estimated Completion</Text>
                        <Text fontSize="md" fontWeight="semibold">{project.keyMetrics.estimatedCompletion}</Text>
                      </VStack>
                    </Grid>

                    {/* Mini Chart */}
                    <Box>
                      <Text fontSize="sm" mb={2}>Progress Over Time</Text>
                      <Line data={data} options={options} />
                    </Box>
                  </VStack>
                </CardBody>
                <CardFooter>
                  <HStack spacing={2}>
                    {/* Quick Links */}
                    <Button colorScheme="teal">
                      <Link href={`/projects/${project.name.replace(/\s+/g, '-').toLowerCase()}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" colorScheme="teal">
                      <Link href="#">View Updates</Link>
                    </Button>
                    {/* Expand/Collapse Button */}
                    <IconButton
                      aria-label={isOpen ? "Collapse project details" : "Expand project details"}
                      icon={isOpen ? <FiChevronUp /> : <FiChevronDown />}
                      onClick={onToggle}
                    />
                  </HStack>
                  {/* Expanded Details */}
                  <Collapse in={isOpen}>
                    <Box mt={2}>
                      <Text fontSize="sm" fontWeight="bold">Detailed Status Updates:</Text>
                      <Text fontSize="sm" color="gray.600">No updates available.</Text>
                    </Box>
                  </Collapse>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ActiveProjects;
