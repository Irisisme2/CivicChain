import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Box,
  Flex,
  Text,
  Badge,
  Tooltip,
  IconButton,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { InfoIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Card, CardHeader, CardBody, CardFooter } from "components/card/Card.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ChartTooltip, Legend);

const VotingActivity = () => {
  const [timeframe, setTimeframe] = useState("week");

  const dataToday = {
    labels: ["12 AM", "3 AM", "6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    datasets: [
      {
        label: "Participation Rate",
        data: [50, 55, 52, 60, 65, 70, 68, 72],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        tension: 0.4,
      },
      {
        label: "Voting Proposals",
        data: [2, 4, 3, 6, 7, 5, 8, 7],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        tension: 0.4,
      },
      {
        label: "Votes Cast",
        data: [100, 120, 110, 150, 170, 160, 180, 200],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        tension: 0.4,
      },
    ],
  };

  const dataWeek = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Participation Rate",
        data: [60, 65, 70, 75, 80, 78, 76],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        tension: 0.4,
      },
      {
        label: "Voting Proposals",
        data: [5, 6, 7, 8, 10, 9, 12],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        tension: 0.4,
      },
      {
        label: "Votes Cast",
        data: [200, 220, 240, 260, 280, 300, 320],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        tension: 0.4,
      },
    ],
  };

  const dataMonth = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Participation Rate",
        data: [70, 75, 80, 85],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        tension: 0.4,
      },
      {
        label: "Voting Proposals",
        data: [15, 18, 20, 22],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        tension: 0.4,
      },
      {
        label: "Votes Cast",
        data: [600, 700, 800, 900],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Metrics',
        },
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
      x: {
        title: {
          display: true,
          text: timeframe === "month" ? 'Week' : timeframe === "week" ? 'Day' : 'Time',
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw;
            if (label === "Participation Rate") {
              return `${label}: ${value}%`;
            } else if (label === "Voting Proposals") {
              return `${label}: ${value} proposals`;
            } else if (label === "Votes Cast") {
              return `${label}: ${value} votes`;
            }
          },
        },
      },
    },
  };

  const refreshData = () => {
    // This function would typically fetch the latest data
    console.log("Data refreshed!");
  };

  return (
    <Card>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">Voting Activity</Text>
          <Box>
            <Tooltip label="This graph shows the recent voting trends, including participation rates, number of proposals, and total votes cast." fontSize="md">
              <IconButton
                variant="ghost"
                icon={<InfoIcon />}
                aria-label="Info"
                mr={2}
              />
            </Tooltip>
            <IconButton
              variant="ghost"
              icon={<RepeatIcon />}
              aria-label="Refresh Data"
              onClick={refreshData}
            />
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <Tabs isFitted variant="enclosed" onChange={(index) => setTimeframe(index === 0 ? "today" : index === 1 ? "week" : "month")}>
          <TabList mb="1em">
            <Tab>Today</Tab>
            <Tab>This Week</Tab>
            <Tab>This Month</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box p={4}>
                <Line data={dataToday} options={options} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p={4}>
                <Line data={dataWeek} options={options} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p={4}>
                <Line data={dataMonth} options={options} />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
      <CardFooter>
        <Flex direction="column" w="100%">
          <Text fontSize="sm" color="gray.500">
            Track the community's voting trends, proposal submissions, and total votes cast over the selected time frame.
          </Text>
          <Divider my={2} />
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="sm" color="green.500" fontWeight="bold">
                Last Recorded: 78% (This Week)
              </Text>
              <Text fontSize="sm" color="orange.500" fontWeight="bold">
                Total Votes Cast: 320 (This Week)
              </Text>
            </Box>
            <Box textAlign="right">
              <Text fontSize="sm" color="blue.500">
                Highest Participation: 85% (This Month)
              </Text>
              <Text fontSize="sm" color="red.500">
                Most Proposals: 22 (This Month)
              </Text>
            </Box>
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default VotingActivity;
