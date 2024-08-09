import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  HStack,
  Button,
  Select,
  Input,
  StackDivider,
  useColorModeValue,
  Tooltip,
  IconButton,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Card from 'components/card/Card.js';
import { FaSearch, FaSort, FaFilter, FaEye, FaPlus } from 'react-icons/fa';

const fetchTransactionData = async () => {
  // Przykład funkcji do pobierania danych z API
  return [
    { id: 1, type: 'Deposit', amount: 1000, date: '2024-08-01', status: 'Completed' },
    { id: 2, type: 'Withdrawal', amount: 500, date: '2024-08-02', status: 'Pending' },
    { id: 3, type: 'Transfer', amount: 300, date: '2024-08-03', status: 'Failed' },
    { id: 4, type: 'Deposit', amount: 700, date: '2024-08-04', status: 'Completed' },
    { id: 5, type: 'Withdrawal', amount: 400, date: '2024-08-05', status: 'Completed' },
    { id: 6, type: 'Deposit', amount: 1500, date: '2024-08-06', status: 'Completed' },
    { id: 7, type: 'Transfer', amount: 200, date: '2024-08-07', status: 'Pending' },
    { id: 8, type: 'Withdrawal', amount: 800, date: '2024-08-08', status: 'Failed' },
    // Dodaj więcej danych dla paginacji
  ];
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [chartType, setChartType] = useState('line');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTransaction, setNewTransaction] = useState({ type: '', amount: 0, date: '', status: 'Pending' });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchTransactionData();
      setTransactions(data);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleAddTransaction = () => {
    setTransactions([...transactions, { id: transactions.length + 1, ...newTransaction }]);
    onClose();
  };

  const filteredTransactions = transactions
    .filter(transaction => 
      (filterStatus === '' || transaction.status === filterStatus) &&
      (searchTerm === '' || transaction.type.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortCriteria === 'amount') {
        return b.amount - a.amount;
      } else if (sortCriteria === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const chartData = {
    labels: currentTransactions.map(t => t.date),
    datasets: [
      {
        label: 'Transaction Amount',
        data: currentTransactions.map(t => t.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
        tension: 0.1,
      }
    ]
  };

  const pieData = {
    labels: ['Completed', 'Pending', 'Failed'],
    datasets: [
      {
        data: [
          transactions.filter(t => t.status === 'Completed').length,
          transactions.filter(t => t.status === 'Pending').length,
          transactions.filter(t => t.status === 'Failed').length,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
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
            const label = context.label || '';
            const value = context.raw;
            return `${label}: $${value}`;
          },
        },
      },
    },
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('teal.600', 'teal.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Card boxShadow="lg" borderRadius="md" p={6} bg={cardBg} borderWidth="1px">
      <VStack spacing={6} align="start" divider={<StackDivider borderColor="gray.200" />}>
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>Transaction History</Text>

        {/* Filtry, wyszukiwanie, sortowanie */}
        <HStack spacing={4} w="100%">
          <Input
            placeholder="Search by type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outline"
            size="md"
          />
          <Select
            placeholder="Filter by status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="md"
          >
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </Select>
          <Select
            placeholder="Sort by"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            size="md"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </Select>
          <Tooltip label="Search Transactions">
            <IconButton
              aria-label="Search"
              icon={<FaSearch />}
              size="md"
            />
          </Tooltip>
          <Button colorScheme="teal" onClick={onOpen}>
            <FaPlus style={{ marginRight: '5px' }} /> Add Transaction
          </Button>
        </HStack>

        {/* Tabela transakcji */}
        <Box w="100%" overflowX="auto">
          <Table variant="simple">
            <Thead bg={headerBg}>
              <Tr>
                <Th color="white">Type</Th>
                <Th color="white">Amount</Th>
                <Th color="white">Date</Th>
                <Th color="white">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <Tr>
                  <Td colSpan={4} textAlign="center">
                    <Spinner size="lg" />
                  </Td>
                </Tr>
              ) : (
                currentTransactions.map(transaction => (
                  <Tr key={transaction.id}>
                    <Td>{transaction.type}</Td>
                    <Td>${transaction.amount}</Td>
                    <Td>{transaction.date}</Td>
                    <Td>{transaction.status}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>

        {/* Paginacja */}
        <HStack spacing={4}>
          {Array.from({ length: Math.ceil(filteredTransactions.length / transactionsPerPage) }, (_, i) => i + 1).map(pageNumber => (
            <Button key={pageNumber} onClick={() => paginate(pageNumber)} colorScheme={pageNumber === currentPage ? 'teal' : 'gray'}>
              {pageNumber}
            </Button>
          ))}
        </HStack>

        {/* Wykresy transakcji */}
        <Box w="100%">
          <HStack spacing={4} mb={4}>
            <Button colorScheme="teal" onClick={() => setChartType('line')}>
              Line Chart
            </Button>
            <Button colorScheme="teal" onClick={() => setChartType('bar')}>
              Bar Chart
            </Button>
            <Button colorScheme="teal" onClick={() => setChartType('pie')}>
              Pie Chart
            </Button>
          </HStack>
          {chartType === 'line' ? (
            <Line data={chartData} options={options} />
          ) : chartType === 'bar' ? (
            <Bar data={chartData} options={options} />
          ) : (
            <Pie data={pieData} options={options} />
          )}
        </Box>
      </VStack>

      {/* Modal do dodawania nowych transakcji */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="type" mb={4}>
              <FormLabel>Type</FormLabel>
              <Select
                placeholder="Select type"
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
              >
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Transfer">Transfer</option>
              </Select>
            </FormControl>
            <FormControl id="amount" mb={4}>
              <FormLabel>Amount</FormLabel>
              <NumberInput
                value={newTransaction.amount}
                onChange={(value) => setNewTransaction({ ...newTransaction, amount: parseFloat(value) })}
                min={0.01}
                precision={2}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl id="status" mb={4}>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Select status"
                value={newTransaction.status}
                onChange={(e) => setNewTransaction({ ...newTransaction, status: e.target.value })}
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </Select>
            </FormControl>
            <FormControl id="date">
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleAddTransaction}>
              Add Transaction
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default TransactionHistory;
