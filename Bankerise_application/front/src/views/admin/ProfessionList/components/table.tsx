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
  fetchProfessions,
  createProfession,
  updateProfession,
  deleteProfession,
} from "store/Profession/ProfessionActions";

export interface Profession {
  id: number;
  label: string;
}

const Table: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingProfession, setIsAddingProfession] = useState(false);
  const [isUpdatingProfession, setIsUpdatingProfession] = useState(false);
  const [newProfessionLabel, setNewProfessionLabel] = useState("");
  const [selectedProfessionId, setSelectedProfessionId] = useState<number | null>(null);

  const professions = useSelector((state: any) => state?.professions?.professions);
  const dispatch = useDispatch();

 
  
  useEffect(() => {
    
    dispatch(fetchProfessions() as any); 
  }, [dispatch]);




  const handleDelete = (professionId: string) => {
    dispatch(deleteProfession(professionId) as any); 
  };

  const handleView = (professionId: number) => {
    console.log(`Voir le produit avec l'ID ${professionId}`);
  };

  const handleUpdate = (professionId: number) => {
    setSelectedProfessionId(professionId);
    setIsUpdatingProfession(true);
    const selectedProfession = professions.find((profession: Profession) => profession.id === professionId);
    if (selectedProfession) {
      setNewProfessionLabel(selectedProfession.label);
    }
  };

  const handleAddProfession = () => {
    setIsAddingProfession(true);
  };

  const handleCancelAddProfession = () => {
    setIsAddingProfession(false);
    setNewProfessionLabel("");
  };

  const handleCancelUpdateProfession = () => {
    setIsUpdatingProfession(false);
    setSelectedProfessionId(null);
    setNewProfessionLabel("");
  };

  const handleSaveProfession = () => {
    const newProfession: Profession = {
      id: professions.length + 1,
      label: newProfessionLabel,
    };
    dispatch(createProfession(newProfession) as any);
    setIsAddingProfession(false);
    setNewProfessionLabel("");
  };

  const handleUpdateProfession = () => {
    if (selectedProfessionId) {
      const updatedProfession: Profession = {
        id: selectedProfessionId,
        label: newProfessionLabel,
      };
      dispatch(updateProfession(updatedProfession) as any);
      setIsUpdatingProfession(false);
      setSelectedProfessionId(null);
      setNewProfessionLabel("");
    }
  };

  const filteredProfessions = professions?.filter((Profession : any) =>
  Profession.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal isOpen={isAddingProfession} onClose={handleCancelAddProfession}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Profession</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="name">Label:</label>
              <input
                type="text"
                id="name"
                value={newProfessionLabel}
                onChange={(e) => setNewProfessionLabel(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveProfession}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancelAddProfession}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isUpdatingProfession}
        onClose={handleCancelUpdateProfession}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profession</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="name">Label:</label>
              <input
                type="text"
                id="name"
                value={newProfessionLabel}
                onChange={(e) => setNewProfessionLabel(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateProfession}>
              Update
            </Button>
            <Button colorScheme="gray" onClick={handleCancelUpdateProfession}>
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
            onClick={handleAddProfession}
            backgroundColor="#67C3D7"
          >
            Add Profession
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
            {filteredProfessions?.map((Profession: any) => (
              <Tr
                key={Profession.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <Td width="20px">{Profession.id}</Td>
                <Td width="60px">{Profession.label}</Td>
                <Td width="20px">
                  <IconButton
                    aria-label="View"
                    icon={<MdVisibility size={16} />}
                    colorScheme="teal"
                    onClick={() => handleView(Profession.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Update"
                    icon={<MdEdit size={16} />}
                    colorScheme="blue"
                    onClick={() => handleUpdate(Profession.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<MdDelete size={16} />}
                    colorScheme="red"
                    onClick={() => handleDelete(Profession.id)}
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
