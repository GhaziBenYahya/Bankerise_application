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
  fetchIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} from "store/Industry/IndustryActions";

export interface Industry {
  id: number;
  label: string;
}

const Table: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingIndustry, setIsAddingIndustry] = useState(false);
  const [isUpdatingIndustry, setIsUpdatingIndustry] = useState(false);
  const [newIndustryLabel, setNewIndustryLabel] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(null);

  const industryList = useSelector((state: any) => state?.industryList?.industryList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIndustries() as any);
  }, [dispatch]);

  const handleDelete = (industryId: string) => {
    dispatch(deleteIndustry(industryId) as any);
  };

  const handleView = (industryId: number) => {
    console.log(`Voir l'industrie avec l'ID ${industryId}`);
  };

  const handleUpdate = (industryId: number) => {
    setSelectedIndustryId(industryId);
    setIsUpdatingIndustry(true);
    const selectedIndustry = industryList.find((industry: Industry) => industry.id === industryId);
    if (selectedIndustry) {
      setNewIndustryLabel(selectedIndustry.label);
    }
  };

  const handleAddIndustry = () => {
    setIsAddingIndustry(true);
  };

  const handleCancelAddIndustry = () => {
    setIsAddingIndustry(false);
    setNewIndustryLabel("");
  };

  const handleCancelUpdateIndustry = () => {
    setIsUpdatingIndustry(false);
    setSelectedIndustryId(null);
    setNewIndustryLabel("");
  };

  const handleSaveIndustry = () => {
    const newIndustry: Industry = {
      id: industryList.length + 1,
      label: newIndustryLabel,
    };
    dispatch(createIndustry(newIndustry) as any);
    setIsAddingIndustry(false);
    setNewIndustryLabel("");
  };

  const handleUpdateIndustry = () => {
    if (selectedIndustryId) {
      const updatedIndustry: Industry = {
        id: selectedIndustryId,
        label: newIndustryLabel,
      };
      dispatch(updateIndustry(updatedIndustry) as any);
      setIsUpdatingIndustry(false);
      setSelectedIndustryId(null);
      setNewIndustryLabel("");
    }
  };

  const filteredIndustryList = industryList?.filter((industry: Industry) =>
    industry.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal isOpen={isAddingIndustry} onClose={handleCancelAddIndustry}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Industry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="label">Label:</label>
              <input
                type="text"
                id="label"
                value={newIndustryLabel}
                onChange={(e) => setNewIndustryLabel(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveIndustry}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancelAddIndustry}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isUpdatingIndustry} onClose={handleCancelUpdateIndustry}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Industry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="label">Label:</label>
              <input
                type="text"
                id="label"
                value={newIndustryLabel}
                onChange={(e) => setNewIndustryLabel(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateIndustry}>
              Update
            </Button>
            <Button colorScheme="gray" onClick={handleCancelUpdateIndustry}>
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
            onClick={handleAddIndustry}
            backgroundColor="#67C3D7"
          >
            Add Industry
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
              <Th>Label</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredIndustryList?.map((industry: any) => (
              <Tr
                key={industry.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <Td width="20px">{industry.id}</Td>
                <Td width="60px">{industry.label}</Td>
                <Td width="20px">
                  <IconButton
                    aria-label="View"
                    icon={<MdVisibility size={16} />}
                    colorScheme="teal"
                    onClick={() => handleView(industry.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Update"
                    icon={<MdEdit size={16} />}
                    colorScheme="blue"
                    onClick={() => handleUpdate(industry.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<MdDelete size={16} />}
                    colorScheme="red"
                    onClick={() => handleDelete(industry.id)}
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
