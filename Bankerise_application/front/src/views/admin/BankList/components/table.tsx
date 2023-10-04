import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Input,
  Table as TableChakra,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { MdDelete, MdAdd, MdVisibility, MdEdit } from "react-icons/md";
import {
  fetchBanks,
  createBank,
  updateBank,
  deleteBank,
} from "store/Bank/bankActions";

export interface Bank {
  id: number;
  code: string;
  name: string;
}

const Table: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [isUpdatingBank, setIsUpdatingBank] = useState(false);
  const [newBankCode, setNewBankCode] = useState("");
  const [newBankName, setNewBankName] = useState("");
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);

  const banks = useSelector((state: any) => state?.banks?.banks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBanks() as any);
  }, [dispatch]);

  const handleDelete = (bankId: string) => {
    dispatch(deleteBank(bankId) as any);
  };

  const handleView = (bankId: number) => {
    console.log(`Voir la banque avec l'ID ${bankId}`);
  };

  const handleUpdate = (bankId: number) => {
    setSelectedBankId(bankId);
    setIsUpdatingBank(true);
    const selectedBank = banks.find((bank: Bank) => bank.id === bankId);
    if (selectedBank) {
      setNewBankCode(selectedBank.code);
      setNewBankName(selectedBank.name);
    }
  };

  const handleAddBank = () => {
    setIsAddingBank(true);
  };

  const handleCancelAddBank = () => {
    setIsAddingBank(false);
    setNewBankCode("");
    setNewBankName("");
  };

  const handleCancelUpdateBank = () => {
    setIsUpdatingBank(false);
    setSelectedBankId(null);
    setNewBankCode("");
    setNewBankName("");
  };

  const handleSaveBank = () => {
    const newBank: Bank = {
      id: banks.length + 1,
      code: newBankCode,
      name: newBankName,
    };
    dispatch(createBank(newBank) as any);
    setIsAddingBank(false);
    setNewBankCode("");
    setNewBankName("");
  };

  const handleUpdateBank = () => {
    if (selectedBankId) {
      const updatedBank: Bank = {
        id: selectedBankId,
        code: newBankCode,
        name: newBankName,
      };
      dispatch(updateBank(updatedBank) as any);
      setIsUpdatingBank(false);
      setSelectedBankId(null);
      setNewBankCode("");
      setNewBankName("");
    }
  };

  const filteredBanks = banks?.filter((bank: Bank) =>
    bank?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal isOpen={isAddingBank} onClose={handleCancelAddBank}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Bank</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                value={newBankCode}
                onChange={(e) => setNewBankCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveBank}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancelAddBank}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isUpdatingBank} onClose={handleCancelUpdateBank}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Bank</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                value={newBankCode}
                onChange={(e) => setNewBankCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateBank}>
              Update
            </Button>
            <Button colorScheme="gray" onClick={handleCancelUpdateBank}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button
            leftIcon={<MdAdd />}
            colorScheme="teal"
            onClick={handleAddBank}
            backgroundColor="#67C3D7"
          >
            Add Bank
          </Button>
        </Box>
        <TableChakra
          variant="outline"
          colorScheme="gray"
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
        >
          <Thead
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
            borderTopRadius="lg"
          >
            <Tr>
              <Th>ID</Th>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBanks?.map((bank: any) => (
              <Tr
                key={bank.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <Td width="20px">{bank.id}</Td>
                <Td width="60px">{bank.code}</Td>
                <Td width="60px">{bank.name}</Td>
                <Td width="20px">
                  <IconButton
                    aria-label="View"
                    icon={<MdVisibility size={16} />}
                    colorScheme="teal"
                    onClick={() => handleView(bank.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Update"
                    icon={<MdEdit size={16} />}
                    colorScheme="blue"
                    onClick={() => handleUpdate(bank.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<MdDelete size={16} />}
                    colorScheme="red"
                    onClick={() => handleDelete(bank.id)}
                    size="sm"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableChakra>
      </>
    </Box>
  );
};

export default Table;
