import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Card, CardHeader, CardBody, CardFooter } from "components/card/Card";

// Rejestracja komponentów wykresu
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ProjectStatistics = () => {
  const [timeframe, setTimeframe] = useState("today");

  // Przykładowe dane dla dzisiaj
  const dataToday = {
    labels: ["Funded", "Ongoing", "Completed"],
    datasets: [
      {
        data: [25, 50, 25], // Procentowe udziały
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"], // Kolory dla segmentów
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  // Przykładowe dane dla tego tygodnia
  const dataWeek = {
    labels: ["Funded", "Ongoing", "Completed"],
    datasets: [
      {
        data: [20, 55, 25],
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  // Przykładowe dane dla tego miesiąca
  const dataMonth = {
    labels: ["Funded", "Ongoing", "Completed"],
    datasets: [
      {
        data: [30, 45, 25],
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
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
        <Text fontSize="lg" fontWeight="bold">
          Project Statistics
        </Text>
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
                <Pie data={dataToday} options={options} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p={4}>
                <Pie data={dataWeek} options={options} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p={4}>
                <Pie data={dataMonth} options={options} />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
      <CardFooter>
        <Text fontSize="sm" color="gray.500">
          Statistics showing the distribution of projects based on their status
          over the selected timeframe.
        </Text>
      </CardFooter>
    </Card>
  );
};

export default ProjectStatistics;
