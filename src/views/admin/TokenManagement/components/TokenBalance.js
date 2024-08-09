import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  useColorModeValue,
  Tooltip,
  Button,
  Input,
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
  Select,
  IconButton
} from '@chakra-ui/react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { FaPlus, FaTrash } from 'react-icons/fa';

// Rejestracja komponentów wykresu
ChartJS.register(ArcElement, ChartTooltip, Legend, BarElement, CategoryScale, LinearScale);

const fetchTokenData = async () => {
  // Przykład funkcji do pobierania danych z API
  return {
    governance: 5000,
    utility: 3000,
    reward: 1500,
    staking: 2000
  };
};

// Przykładowe opcje dla wyboru sortowania
const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' }
];

const TokenBalance = () => {
  const [tokenData, setTokenData] = useState({});
  const [chartType, setChartType] = useState('pie');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedToken, setEditedToken] = useState({ type: '', value: 0 });
  const [newToken, setNewToken] = useState({ type: '', value: 0 });
  const [sortCriteria, setSortCriteria] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchTokenData();
        setTokenData(data);
      } catch (error) {
        console.error("Failed to fetch token data:", error);
        setTokenData({});
      }
      setLoading(false);
    };

    loadData();
  }, []);

  const handleEditToken = (type) => {
    setEditedToken({ type, value: tokenData[type] });
    onOpen();
  };

  const handleSaveToken = () => {
    setTokenData(prevData => ({
      ...prevData,
      [editedToken.type]: editedToken.value
    }));
    onClose();
  };

  const handleAddToken = () => {
    setTokenData(prevData => ({
      ...prevData,
      [newToken.type]: newToken.value
    }));
    setNewToken({ type: '', value: 0 });
  };

  const handleRemoveToken = (type) => {
    const updatedData = { ...tokenData };
    delete updatedData[type];
    setTokenData(updatedData);
  };

  const data = {
    labels: Object.keys(tokenData),
    datasets: [
      {
        label: 'Token Distribution',
        data: Object.values(tokenData),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const barData = {
    labels: Object.keys(tokenData),
    datasets: [
      {
        label: 'Token Distribution',
        data: Object.values(tokenData),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
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
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value} tokens (${((value / Object.values(tokenData).reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%)`;
          },
        },
      },
    },
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const sortedTokens = Object.entries(tokenData)
    .filter(([type]) => type.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortCriteria === 'amount') {
        return b[1] - a[1];
      }
      return a[0].localeCompare(b[0]);
    });

  const cardBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('teal.600', 'teal.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Card boxShadow="lg" borderRadius="md" p={6} bg={cardBg} borderWidth="1px">
      <CardHeader bg={headerBg} color="white" borderTopRadius="md" p={4}>
        <Text fontSize="2xl" fontWeight="bold">Token Balance Overview</Text>
      </CardHeader>

      <CardBody>
        <VStack spacing={6} align="start">
          <HStack spacing={4} mb={6}>
            <Input
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={handleSearch}
              variant="outline"
              size="sm"
            />
            <Select
              placeholder="Sort by"
              value={sortCriteria}
              onChange={handleSortChange}
              size="sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
            <Button colorScheme="teal" onClick={() => setNewToken({ type: '', value: 0 })}>Add Token</Button>
          </HStack>

          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Text fontSize="lg" fontWeight="bold" color={textColor}>Current Token Balances:</Text>
              <VStack spacing={4} mb={4} align="start">
                {sortedTokens.map(([type, amount]) => (
                  <Box key={type} p={4} borderWidth="1px" borderRadius="md" boxShadow="md" bg={cardBg}>
                    <HStack spacing={4}>
                      <Text fontSize="md" fontWeight="semibold">{type}</Text>
                      <Text fontSize="md">{amount} tokens</Text>
                      <Tooltip label="Edit Token">
                        <IconButton
                          aria-label="Edit Token"
                          icon={<FaPlus />}
                          onClick={() => handleEditToken(type)}
                          size="sm"
                        />
                      </Tooltip>
                      <Tooltip label="Remove Token">
                        <IconButton
                          aria-label="Remove Token"
                          icon={<FaTrash />}
                          onClick={() => handleRemoveToken(type)}
                          size="sm"
                        />
                      </Tooltip>
                    </HStack>
                  </Box>
                ))}
              </VStack>

              <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg={cardBg}>
                <Text fontSize="lg" fontWeight="bold" color={textColor}>Token Distribution Chart</Text>
                {Object.keys(tokenData).length > 0 && (
                  <>
                    {chartType === 'pie' ? (
                      <Pie data={data} options={options} />
                    ) : (
                      <Bar data={barData} options={options} />
                    )}
                    <HStack spacing={4} mt={4}>
                      <Button colorScheme="teal" onClick={() => setChartType('pie')}>Pie Chart</Button>
                      <Button colorScheme="teal" onClick={() => setChartType('bar')}>Bar Chart</Button>
                    </HStack>
                  </>
                )}
              </Box>
            </>
          )}
        </VStack>
      </CardBody>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="tokenType" mb={4}>
              <FormLabel>Token Type</FormLabel>
              <Input value={editedToken.type} isDisabled />
            </FormControl>
            <FormControl id="tokenAmount">
              <FormLabel>Token Amount</FormLabel>
              <NumberInput
                value={editedToken.value}
                onChange={(valueString) => setEditedToken({ ...editedToken, value: parseInt(valueString, 10) })}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveToken}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default TokenBalance;
