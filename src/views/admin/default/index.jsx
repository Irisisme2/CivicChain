/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import { MdAssessment, MdEvent, MdGroup, MdFolder, MdPoll, MdPeople } from "react-icons/md";
import ActiveProjects from "views/admin/default/components/ActiveProjects";
import PieCard from "views/admin/default/components/PieCard";
import DashboardWidgets from "views/admin/default/components/DashboardWidgets";
import VotingActivity from "views/admin/default/components/VotingActivity";
import ParticipationMetrics from "views/admin/default/components/ParticipationMetrics";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
      gap='20px'
      mb='20px'>
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)' 
            icon={<Icon w='32px' h='32px' as={MdAssessment} color='white' />} 
          />
        }
        name='Active Projects'
        value='125' 
      />
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg='linear-gradient(90deg, #FF5722 0%, #FFC107 100%)' 
            icon={<Icon w='32px' h='32px' as={MdPoll} color='white' />}
          />
        }
        name='Ongoing Votes'
        value='7'
      />
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg='linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)'
            icon={<Icon w='32px' h='32px' as={MdGroup} color='white' />} 
          />
        }
        name='Community Participation'
        value='890'
      />
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg='linear-gradient(90deg, #9C27B0 0%, #E040FB 100%)' 
            icon={<Icon w='32px' h='32px' as={MdFolder} color='white' />} 
          />
        }
        name='Total Projects'
        value='2935' 
      />
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg='linear-gradient(90deg, #3F51B5 0%, #536DFE 100%)'
            icon={<Icon w='32px' h='32px' as={MdEvent} color='white' />}
          />
        }
        name='Upcoming Events'
        value='12' 
      />
    </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <VotingActivity />
        <ParticipationMetrics />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ActiveProjects  />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DashboardWidgets />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
