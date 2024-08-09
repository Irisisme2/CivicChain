import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Select,
  StackDivider,
  useColorModeValue,
  FormControl,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  IconButton,
  Divider
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Card from 'components/card/Card.js';

// Rejestracja komponentów wykresu
ChartJS.register(LineElement, PointElement, ChartTooltip, Legend, CategoryScale, LinearScale);

// Przykładowe dane
const stakingData = [
  { id: 1, category: 'Pool A', activity: 'Stake', amount: 1000, date: '2024-07-15', rewardsEarned: 50 },
  { id: 2, category: 'Pool B', activity: 'Unstake', amount: -500, date: '2024-07-20', rewardsEarned: 20 },
  { id: 3, category: 'Pool A', activity: 'Stake', amount: 2000, date: '2024-08-01', rewardsEarned: 100 },
  { id: 4, category: 'Pool C', activity: 'Stake', amount: 1500, date: '2024-08-05', rewardsEarned: 75 },
];

const rewardTrackerData = {
  labels: ['2024-07-15', '2024-07-20', '2024-08-01', '2024-08-05'],
  datasets: [
    {
      label: 'Rewards Earned',
      data: [50, 70, 170, 245],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      fill: false,
      tension: 0.1,
    },
  ],
};

const StakingAndRewards = () => {
  const [selectedActivity, setSelectedActivity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [selectedStaking, setSelectedStaking] = useState(null);
  const [newStakingData, setNewStakingData] = useState({
    category: '',
    activity: 'Stake',
    amount: 0,
    date: '',
    rewardsEarned: 0
  });
  const [filteredData, setFilteredData] = useState(stakingData);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddStakingData = () => {
    setFilteredData(prevData => [...prevData, newStakingData]);
    setNewStakingData({
      category: '',
      activity: 'Stake',
      amount: 0,
      date: '',
      rewardsEarned: 0
    });
    onClose();
  };

  const handleEditStakingData = () => {
    setFilteredData(prevData => prevData.map(item => item.id === selectedStaking.id ? newStakingData : item));
    setNewStakingData({
      category: '',
      activity: 'Stake',
      amount: 0,
      date: '',
      rewardsEarned: 0
    });
    onClose();
  };

  const handleDeleteStakingData = (id) => {
    setFilteredData(prevData => prevData.filter(item => item.id !== id));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilteredData(stakingData.filter(item =>
      (item.activity.toLowerCase().includes(value) || item.category.toLowerCase().includes(value))
    ));
  };

  const handleFilterChange = () => {
    let updatedData = stakingData;

    if (selectedActivity !== 'All') {
      updatedData = updatedData.filter(item => item.activity === selectedActivity);
    }

    if (selectedCategory !== 'All') {
      updatedData = updatedData.filter(item => item.category === selectedCategory);
    }

    if (startDate && endDate) {
      updatedData = updatedData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    setFilteredData(updatedData);
  };

  const totalStaked = filteredData.reduce((sum, item) => sum + Math.max(0, item.amount), 0);
  const totalRewards = filteredData.reduce((sum, item) => sum + item.rewardsEarned, 0);

  const cardBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('teal.600', 'teal.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Card boxShadow="lg" borderRadius="md" p={6} bg={cardBg} borderWidth="1px">
      <VStack spacing={6} align="start" divider={<StackDivider borderColor="gray.200" />}>
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>Staking Overview</Text>

        <HStack spacing={4} mb={6}>
          <FormControl>
            <FormLabel>Search</FormLabel>
            <Input placeholder="Search staking data..." onChange={handleSearchChange} variant="outline" size="sm" />
          </FormControl>

          <Select
            placeholder="Filter by activity"
            value={selectedActivity}
            onChange={(e) => {
              setSelectedActivity(e.target.value);
              handleFilterChange();
            }}
            size="sm"
          >
            <option value="All">All</option>
            <option value="Stake">Stake</option>
            <option value="Unstake">Unstake</option>
          </Select>

          <Select
            placeholder="Filter by category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              handleFilterChange();
            }}
            size="sm"
          >
            <option value="All">All</option>
            <option value="Pool A">Pool A</option>
            <option value="Pool B">Pool B</option>
            <option value="Pool C">Pool C</option>
          </Select>

          <FormControl>
            <FormLabel>Date Range</FormLabel>
            <HStack spacing={4}>
              <Input
                type="date"
                value={startDate ? startDate.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  setStartDate(new Date(e.target.value));
                  handleFilterChange();
                }}
              />
              <Input
                type="date"
                value={endDate ? endDate.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  setEndDate(new Date(e.target.value));
                  handleFilterChange();
                }}
              />
            </HStack>
          </FormControl>

          <Button colorScheme="teal" onClick={() => { setModalType('add'); onOpen(); }}>Add Staking Data</Button>
        </HStack>

        <Box w="100%" overflowX="auto">
          <Text fontSize="lg" fontWeight="bold" color={textColor} mb={4}>Staking History</Text>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: headerBg }}>
              <tr>
                <th style={{ color: 'white', padding: '10px', textAlign: 'left' }}>Category</th>
                <th style={{ color: 'white', padding: '10px', textAlign: 'left' }}>Activity</th>
                <th style={{ color: 'white', padding: '10px', textAlign: 'left' }}>Amount</th>
                <th style={{ color: 'white', padding: '10px', textAlign: 'left' }}>Date</th>
                <th style={{ color: 'white', padding: '10px', textAlign: 'left' }}>Rewards Earned</th>
                <th style={{ color: 'white', padding: '10px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: '10px', borderBottom: `1px solid ${textColor}` }}>{item.category}</td>
                  <td style={{ padding: '10px', borderBottom: `1px solid ${textColor}` }}>{item.activity}</td>
                  <td style={{ padding: '10px', borderBottom: `1px solid ${textColor}` }}>${item.amount}</td>
                  <td style={{ padding: '10px', borderBottom: `1px solid ${textColor}` }}>{item.date}</td>
                  <td style={{ padding: '10px', borderBottom: `1px solid ${textColor}` }}>${item.rewardsEarned}</td>
                  <td style={{ padding: '10px', borderBottom: `1px solid ${textColor}` }}>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Edit"
                        icon={<FaEdit />}
                        onClick={() => {
                          setSelectedStaking(item);
                          setNewStakingData(item);
                          setModalType('edit');
                          onOpen();
                        }}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<FaTrash />}
                        onClick={() => handleDeleteStakingData(item.id)}
                      />
                    </HStack>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        <Box w="100%" mt={6}>
          <Text fontSize="lg" fontWeight="bold" color={textColor} mb={4}>Reward Tracker</Text>
          <Line data={rewardTrackerData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `$${tooltipItem.raw}`;
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Rewards Earned'
                },
                beginAtZero: true
              }
            }
          }} />
        </Box>
      </VStack>

      {/* Modal for Adding and Editing Staking Data */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalType === 'add' ? 'Add Staking Data' : 'Edit Staking Data'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Input
                  placeholder="Enter category"
                  value={newStakingData.category}
                  onChange={(e) => setNewStakingData({ ...newStakingData, category: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Activity</FormLabel>
                <Select
                  value={newStakingData.activity}
                  onChange={(e) => setNewStakingData({ ...newStakingData, activity: e.target.value })}
                >
                  <option value="Stake">Stake</option>
                  <option value="Unstake">Unstake</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Amount</FormLabel>
                <NumberInput
                  value={newStakingData.amount}
                  onChange={(value) => setNewStakingData({ ...newStakingData, amount: parseFloat(value) })}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={newStakingData.date}
                  onChange={(e) => setNewStakingData({ ...newStakingData, date: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Rewards Earned</FormLabel>
                <NumberInput
                  value={newStakingData.rewardsEarned}
                  onChange={(value) => setNewStakingData({ ...newStakingData, rewardsEarned: parseFloat(value) })}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => modalType === 'add' ? handleAddStakingData() : handleEditStakingData()}>
              {modalType === 'add' ? 'Add' : 'Save'}
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default StakingAndRewards;
