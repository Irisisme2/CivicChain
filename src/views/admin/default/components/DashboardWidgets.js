import React from "react";
import { Box, Text, VStack, HStack, Badge, List, ListItem } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "components/card/Card.js";

const DashboardWidgets = () => {
  // Example data
  const activeProjects = {
    total: 120,
    funded: 80,
    completed: 40,
  };

  const recentAnnouncements = [
    "New project funding opportunities are now available!",
    "Join our upcoming webinar on blockchain innovation.",
    "Update: Recent changes in project guidelines.",
    "Community meetup scheduled for next month.",
    "New features added to the voting system.",
  ];

  return (
    <VStack spacing={4} align="stretch">
      {/* Active Projects Count Widget */}
      <Card>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">Active Projects Count</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={3} align="start">
            <HStack spacing={2}>
              <Badge colorScheme="green">Total Projects</Badge>
              <Text fontSize="xl" fontWeight="semibold">{activeProjects.total}</Text>
            </HStack>
            <HStack spacing={2}>
              <Badge colorScheme="blue">Funded</Badge>
              <Text fontSize="xl" fontWeight="semibold">{activeProjects.funded}</Text>
            </HStack>
            <HStack spacing={2}>
              <Badge colorScheme="orange">Completed</Badge>
              <Text fontSize="xl" fontWeight="semibold">{activeProjects.completed}</Text>
            </HStack>
          </VStack>
        </CardBody>
        <CardFooter>
          <Text fontSize="sm" color="gray.500">
            Overview of project statuses in the current period.
          </Text>
        </CardFooter>
      </Card>

      {/* Recent Announcements Widget */}
      <Card>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">Recent Announcements</Text>
        </CardHeader>
        <CardBody>
          <List spacing={3}>
            {recentAnnouncements.map((announcement, index) => (
              <ListItem key={index}>
                <Text fontSize="md">{announcement}</Text>
              </ListItem>
            ))}
          </List>
        </CardBody>
        <CardFooter>
          <Text fontSize="sm" color="gray.500">
            Latest updates and important announcements for the community.
          </Text>
        </CardFooter>
      </Card>
    </VStack>
  );
};

export default DashboardWidgets;
