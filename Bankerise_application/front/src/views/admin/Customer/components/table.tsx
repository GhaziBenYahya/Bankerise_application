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
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import Swal from 'sweetalert2';

import { MdDelete, MdAdd, MdVisibility, MdEdit } from "react-icons/md";
import { deleteCustomer, fetchCustomer, createCustomer, updateCustomer } from "store/Customer/CustomerActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export interface Customer {
  id: number;
  firstname: string;
  lastname: String;
  cin: string;
  address: String;
  profession: String;
  civilState: String;
}

const Table: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [isUpdatingCustomer, setIsUpdatingCustomer] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newCin, setNewCin] = useState("");
  const [newAdress, setNewAdress] = useState("");
  const [newProfession, setNewProfession] = useState("");
  const [newCivilStatus, setNewCivilStatus] = useState("");
  const [isViewingCustomer, setIsViewingCustomer] = useState(false);

  const customers = useSelector((state: any) => state?.customers?.customers);
  console.log(customers)

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCustomer() as any);
  }, [dispatch]);
  
  const handleDelete = (CustomerId: number) => {
    dispatch(deleteCustomer(CustomerId) as any);
  };


  const handleView = (customerId: number) => {
    console.log(`Voir le client avec l'ID ${customerId}`);
    setSelectedCustomerId(customerId);
    setIsViewingCustomer(true);
    const selectedCustomer = customers.find((customer: Customer) => customer.id === customerId);
    if (selectedCustomer) {
      setNewFirstName(selectedCustomer.firstname);
      setNewLastName(selectedCustomer.lastname);
      setNewCin(selectedCustomer.cin);
      setNewAdress(selectedCustomer.address);
      setNewProfession(selectedCustomer.profession);
      setNewCivilStatus(selectedCustomer.civilState);
    }
    };
  const handleUpdate = (CustomerId: number) => {
    setSelectedCustomerId(CustomerId);
    setIsUpdatingCustomer(true);
    const selectedCustomer = customers.find(
      (customer: Customer) =>
        customer.id === CustomerId
    );
    if (selectedCustomer) {
      setNewFirstName(selectedCustomer.firstname);
      setNewLastName(selectedCustomer.lastname);
      setNewCin(selectedCustomer.cin);
      setNewAdress(selectedCustomer.address);
      setNewProfession(selectedCustomer.profession);
      setNewCivilStatus(selectedCustomer.civilState);
      console.log(selectedCustomer)
    }

  };

  const handleAddCustomer = () => {
    setIsAddingCustomer(true);
  };

  const handleCancelAddCustomer = () => {
    setIsAddingCustomer(false);
    setNewFirstName("");
    setNewLastName("");
    setNewAdress("");
    setNewCin("");
    setNewCivilStatus("");
    setNewProfession("");
  };

  const handleCancelUpdateCustomer = () => {
    setIsUpdatingCustomer(false);
    setNewFirstName("");
    setNewLastName("");
    setNewAdress("");
    setNewCin("");
    setNewCivilStatus("");
    setNewProfession("");

  };

  const handleSaveCustomer = () => {
    const newCustomer: Customer = {
      id: customers.length + 1,
      firstname:newFirstName ,
      lastname: newLastName,
      cin: newCin,
      address:newAdress ,
      profession:newProfession ,
      civilState: newCivilStatus,
    };
    dispatch(createCustomer(newCustomer) as any);
    setIsAddingCustomer(false);
    setNewFirstName("");
    setNewLastName("");
    setNewAdress("");
    setNewCin("");
    setNewCivilStatus("");
    setNewProfession("");
    Swal.fire({
      text: 'The customer was added successfully',
      confirmButtonText: 'Cancel',
      icon: 'success',
      confirmButtonColor: '#979292'
    });
    };
    const handleViewModalClose = () => {
      setIsViewingCustomer(false);
    };
  const handleUpdateCustomer = () => {
    if(selectedCustomerId){
      const updatedCustomer : Customer ={
        id: selectedCustomerId,
        firstname:newFirstName ,
        lastname: newLastName,
        cin: newCin,
        address:newAdress ,
        profession:newProfession ,
        civilState: newCivilStatus,
      }
      dispatch(updateCustomer(updatedCustomer) as any);
      console.log(dispatch(updateCustomer(updatedCustomer) as any))

      setIsUpdatingCustomer(false);
      setSelectedCustomerId(null);

      setNewFirstName("");
      setNewLastName("");
      setNewAdress("");
      setNewCin("");
      setNewCivilStatus("");
      setNewProfession("");

    }

Swal.fire({ 
             
  text:   "The customer was updated successfully",
  confirmButtonText: 'Cancel',
  icon : "success" ,
  confirmButtonColor:"#979292 "

})
};
  const filteredCustomer = customers?.filter(
    (customer: Customer) =>
    customer?.cin?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  
  const isButtonDisabled = !newFirstName || !newLastName || !newCin  || !newProfession|| !newCivilStatus;
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <div>
        <ToastContainer/>
      </div>
      <Modal
        isOpen={isAddingCustomer}
        onClose={handleCancelAddCustomer}
      >
        <ModalOverlay />
        <ModalContent>
        
        <ModalHeader  color="white" backgroundColor="#67C3D7">Add Customer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <form >
         <FormControl >
           <FormLabel htmlFor='firstname' >First Name</FormLabel>
         <Input
          placeholder="First Name"
          id="firstname"
          value={newFirstName}
          onChange={(e) =>
            setNewFirstName(e.target.value)
          }
          required
           /> 
           <FormLabel htmlFor='lastname'marginTop={4}>Last Name</FormLabel>
         <Input
          placeholder="Last Name"
          id="lastname"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
          required
           /> 
             <FormLabel htmlFor="cin" marginTop={4}>CIN</FormLabel>
         <Input
          placeholder="CIN"
          id="cin"
          value={newCin}
          onChange={(e) =>
          setNewCin(e.target.value)
              }
             required
           /> 
            <FormLabel htmlFor="address" marginTop={4}>Adress</FormLabel>
           <Input
          placeholder="Adress"
          id="address"
          value={newAdress}
          onChange={(e) =>
            setNewAdress(e.target.value)
          }
             required
           /> 
           <FormLabel htmlFor="profession" marginTop={4}>Profession</FormLabel>
           <Input
          placeholder="profession"
          id="profession"
          value={newProfession}
          onChange={(e) =>
            setNewProfession(e.target.value)
          }
             required
           /> 
           <FormLabel htmlFor="civilState" marginTop={4}>Civil status</FormLabel>
           <Input
          placeholder="Civil State"
          id="civilState"
          value={newCivilStatus}
              onChange={(e) =>
                setNewCivilStatus(e.target.value)
              }
             required
           /> 
        </FormControl>
      </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" disabled={isButtonDisabled} onClick={handleSaveCustomer}>
            Save
          </Button>
          <Button colorScheme="gray" onClick={handleCancelAddCustomer}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Modal
      isOpen={isUpdatingCustomer}
      onClose={handleCancelUpdateCustomer}
    >
      <ModalOverlay />
      <ModalContent >
        <ModalHeader color="white" backgroundColor="#67C3D7">Update customer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <div>
        <FormControl >
           <FormLabel htmlFor='firstname' >First Name</FormLabel>
         <Input
          placeholder="First Name"
          id="firstname"
          value={newFirstName}
          onChange={(e) =>
            setNewFirstName(e.target.value)
          }
          required
           /> 
           <FormLabel htmlFor='lastname'marginTop={4}>Last Name</FormLabel>
         <Input
          placeholder="Last Name"
          id="lastname"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
          required
           /> 
             <FormLabel htmlFor="cin" marginTop={4}>CIN</FormLabel>
         <Input
          placeholder="CIN"
          id="cin"
          value={newCin}
          onChange={(e) =>
          setNewCin(e.target.value)
              }
             required
           /> 
            <FormLabel htmlFor="address" marginTop={4}>Adress</FormLabel>
           <Input
          placeholder="Adress"
          id="address"
          value={newAdress}
          onChange={(e) =>
            setNewAdress(e.target.value)
          }
             required
           /> 
           <FormLabel htmlFor="profession" marginTop={4}>Profession</FormLabel>
           <Input
          placeholder="profession"
          id="profession"
          value={newProfession}
          onChange={(e) =>
            setNewProfession(e.target.value)
          }
             required
           /> 
           <FormLabel htmlFor="civilState" marginTop={4}>Civil status</FormLabel>
           <Input
          placeholder="Civil Status"
          id="civilState"
          value={newCivilStatus}
              onChange={(e) =>
                setNewCivilStatus(e.target.value)
              }
             required
           /> 
        </FormControl>
        </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" disabled={isButtonDisabled} onClick={handleUpdateCustomer}>
            Update
          </Button>
          <Button
            colorScheme="gray"
            onClick={handleCancelUpdateCustomer}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
      </Modal>
      {isViewingCustomer && selectedCustomerId && (
        <Modal isOpen={isViewingCustomer} onClose={handleViewModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>View Customer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>
                <FormLabel htmlFor="code">Code:</FormLabel>
                <Input
                  type="text"
                  id="code"
                  value={newFirstName}
                  isReadOnly
                />
              </div>
              <div>
                <FormLabel htmlFor="code">Code:</FormLabel>
                <Input
                  type="text"
                  id="code"
                  value={newLastName}
                  isReadOnly
                />
              </div>
              <div>
                <FormLabel htmlFor="label">Label:</FormLabel>
                <Input
                  type="text"
                  id="label"
                  value={newProfession}
                  isReadOnly
                />
              </div>
              <div>
                <FormLabel htmlFor="code">Code:</FormLabel>
                <Input
                  type="text"
                  id="code"
                  value={newAdress}
                  isReadOnly
                />
              </div>
              <div>
                <FormLabel htmlFor="code">Code:</FormLabel>
                <Input
                  type="text"
                  id="code"
                  value={newCin}
                  isReadOnly
                />
              </div>
                 <div>
                <FormLabel htmlFor="code">Code:</FormLabel>
                <Input
                  type="text"
                  id="code"
                  value={newFirstName}
                  isReadOnly
                />
              </div>
              <div>
                <FormLabel htmlFor="code">Code:</FormLabel>
                <Input
                  type="text"
                  id="code"
                  value={newCivilStatus}
                  isReadOnly
                />
              </div>
            </ModalBody>
            <ModalFooter>
             {/*  <Button colorScheme="gray" onClick={handleViewModalClose}>
                Close
              </Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>)}      <>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button
            leftIcon={<MdAdd />}
            colorScheme="teal"
            onClick={handleAddCustomer}
            backgroundColor="#67C3D7"
          >
            Add Customer
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
              <Th>CIN</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Adress</Th>
              <Th>Profession</Th>
              <Th>Civil State</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCustomer?.map((customers: any ) => (
              <Tr
                key={customers.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <Td width="20px">{customers.id}</Td>
                <Td width="20px">{customers.cin}</Td>
                <Td width="20px">{customers.firstname}</Td>
                <Td width="20px">{customers.lastname}</Td>
                <Td width="20px">{customers.address}</Td>
                <Td width="20px">{customers.profession}</Td>
                <Td width="20px">{customers.civilState}</Td>
                <Td width="30px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      aria-label="View"
                      icon={<MdVisibility size={16} />}
                      colorScheme="teal"
                      onClick={() => handleView(customers.id)}
                      size="sm"
                      mr={1}
                    />
                    <IconButton
                      aria-label="Update"
                      icon={<MdEdit size={16} />}
                      colorScheme="blue"
                      onClick={() => handleUpdate(customers.id)}
                      size="sm"
                      mr={1}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<MdDelete size={16} />}
                      colorScheme="red"
                      onClick={() => handleDelete(customers.id)}
                      size="sm"
                      mr={1}
                    />
                  </Box>
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

