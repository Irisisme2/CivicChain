import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdHome,             
  MdAccountBalance, 
  MdWork,           
  MdSettings,       
  MdStar,            
  MdAdd,                
  MdUpdate,            
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Governance from "views/admin/Governance";
import CommunityProjects from "views/admin/CommunityProjects";
import TokenManagement from "views/admin/TokenManagement";
import FeaturedProjects from "views/admin/Projects";
import Proposals from "views/admin/Proposals";
import OngoingProjects from "views/admin/OngoingProjects";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Governance",
    layout: "/admin",
    path: "/Governance",
    icon: <Icon as={MdAccountBalance} width='20px' height='20px' color='inherit' />,
    component: Governance,
    secondary: true,
  },
  {
    name: "Community Projects",
    layout: "/admin",
    path: "/CommunityProjects",
    icon: <Icon as={MdWork} width='20px' height='20px' color='inherit' />,
    component: CommunityProjects,
  },
  {
    name: "Token Management",
    layout: "/admin",
    path: "/TokenManagement",
    icon: <Icon as={MdSettings} width='20px' height='20px' color='inherit' />,
    component: TokenManagement,
  },

];

export default routes;
