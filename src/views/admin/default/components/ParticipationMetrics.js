import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Card, CardHeader, CardBody, CardFooter } from "components/card/Card.js";

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ParticipationMetrics = () => {
  const [timeframe, setTimeframe] = useState("today");

  // Example data for today
  const dataToday = {
    labels: [
      "Decentralized Voting System",
      "SocialFi Integration",
      "Real-World Asset Tokenization",
      "Cross-Chain DeFi Platform",
      "Blockchain Charity Initiative",
    ],
    datasets: [
      {
        label: "Participants",
        data: [30, 25, 35, 40, 28], // Number of participants today
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
    ],
  };

  // Example data for this week
  const dataWeek = {
    labels: [
      "Decentralized Voting System",
      "SocialFi Integration",
      "Real-World Asset Tokenization",
      "Cross-Chain DeFi Platform",
      "Blockchain Charity Initiative",
    ],
    datasets: [
      {
        label: "Participants",
        data: [120, 85, 95, 140, 110], // Number of participants this week
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
    ],
  };

  // Example data for this month
  const dataMonth = {
    labels: [
      "Decentralized Voting System",
      "SocialFi Integration",
      "Real-World Asset Tokenization",
      "Cross-Chain DeFi Platform",
      "Blockchain Charity Initiative",
    ],
    datasets: [
      {
        label: "Participants",
        data: [300, 250, 320, 350, 280], // Number of participants this month
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold">Participation Metrics</Text>
      </CardHeader>
      <CardBody>
        <Tabs
          isFitted
          variant="enclosed"
          onChange={(index) =>
            setTimeframe(index === 0 ? "today" : index === 1 ? "week" : "month")
          }
        >
          <TabList mb="1em">
            <Tab>Today</Tab>
            <Tab>This Week</Tab>
            <Tab>This Month</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box p={4}>
                <Bar data={dataToday} options={options} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p={4}>
                <Bar data={dataWeek} options={options} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p={4}>
                <Bar data={dataMonth} options={options} />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
      <CardFooter>
        <Text fontSize="sm" color="gray.500">
          Number of participants across different community-driven blockchain projects over the selected timeframe.
        </Text>
      </CardFooter>
    </Card>
  );
};

export default ParticipationMetrics;
