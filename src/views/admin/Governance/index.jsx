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
import { Box,SimpleGrid, Grid } from "@chakra-ui/react";

// Custom components
import UpcomingVotes from "views/admin/Governance/components/UpcomingVotes";
import RecentVotes from "views/admin/Governance/components/RecentVotes";
import VotingHistory from "views/admin/Governance/components/VotingHistory";


import React from "react";

export default function Overview() {
  return (
    <SimpleGrid gap='20px' mb='20px'>
    <UpcomingVotes />
    <RecentVotes />
    <VotingHistory />
  </SimpleGrid>
  );
}
