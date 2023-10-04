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
FormLabel
} from "@chakra-ui/react";
import Swal from 'sweetalert2';

import { MdDelete, MdAdd, MdVisibility, MdEdit } from "react-icons/md";
import {
fetchCustomers,
createCustomer,
updateCustomer,
deleteCustomer,
} from "store/CustomerSegments/CustomerSegmentsActions";

export interface Customer {
id: number;
code: string;
name: string;
}

const Table: React.FC = () => {
const [searchTerm, setSearchTerm] = useState("");
const [isAddingCustomer, setIsAddingCustomer] = useState(false);
const [isUpdatingCustomer, setIsUpdatingCustomer] = useState(false);
const [newCustomerCode, setNewCustomerCode] = useState("");
const [newCustomerName, setNewCustomerName] = useState("");
const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
const [isViewingCustomer, setIsViewingCustomer] = useState(false);


const customers = useSelector((state: any) => state?.customers?.customers);
const dispatch = useDispatch();

useEffect(() => {
dispatch(fetchCustomers() as any);
}, [dispatch]);

const handleDelete = (customerId: number) => {
dispatch(deleteCustomer(customerId) as any);
};

const handleView = (customerId: number) => {
console.log(`Voir le client avec l'ID ${customerId}`);
setSelectedCustomerId(customerId);
setIsViewingCustomer(true);
const selectedCustomer = customers.find((customer: Customer) => customer.id === customerId);
if (selectedCustomer) {
setNewCustomerCode(selectedCustomer.code);
setNewCustomerName(selectedCustomer.name);
}
};

const handleUpdate = (customerId: number) => {
setSelectedCustomerId(customerId);
setIsUpdatingCustomer(true);
const selectedCustomer = customers.find((customer: Customer) => customer.id === customerId);
if (selectedCustomer) {
setNewCustomerCode(selectedCustomer.code);
setNewCustomerName(selectedCustomer.name);
}
};

const handleAddCustomer = () => {
setIsAddingCustomer(true);
};

const handleCancelAddCustomer = () => {
setIsAddingCustomer(false);
setNewCustomerCode("");
setNewCustomerName("");
};

const handleCancelUpdateCustomer = () => {
setIsUpdatingCustomer(false);
setSelectedCustomerId(null);
setNewCustomerCode("");
setNewCustomerName("");
};

const handleSaveCustomer = () => {
const newCustomer: Customer = {
id: customers.length + 1,
code: newCustomerCode,
name: newCustomerName,
};
dispatch(createCustomer(newCustomer) as any);
setIsAddingCustomer(false);
setNewCustomerCode("");
setNewCustomerName("");
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
if (selectedCustomerId) {
const updatedCustomer: Customer = {
id: selectedCustomerId,
code: newCustomerCode,
name: newCustomerName,
};
dispatch(updateCustomer(updatedCustomer) as any);
setIsUpdatingCustomer(false);
setSelectedCustomerId(null);
setNewCustomerCode("");
setNewCustomerName("");
}
Swal.fire({ 
             
  text:   "The customer was updated successfully",
  confirmButtonText: 'Cancel',
  icon : "success" ,
  confirmButtonColor:"#979292 "

})
};

const filteredCustomers = customers?.filter((customer: Customer) =>
customer.name.toLowerCase().includes(searchTerm.toLowerCase())
);
return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal isOpen={isAddingCustomer} onClose={handleCancelAddCustomer}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader  color="white" backgroundColor="#67C3D7">Add Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <FormLabel htmlFor="code">Code:</FormLabel>
              <Input
                type="text"
                id="code"
                value={newCustomerCode}
                onChange={(e) => setNewCustomerCode(e.target.value)}
                required
              />
            </div>
            <div>
              <FormLabel htmlFor="name">Name:</FormLabel>
              <Input
                type="text"
                id="name"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveCustomer}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancelAddCustomer}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isUpdatingCustomer} onClose={handleCancelUpdateCustomer}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader  color="white" backgroundColor="#67C3D7">Update Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <FormLabel htmlFor="code">Code:</FormLabel>
              <Input
                type="text"
                id="code"
                value={newCustomerCode}
                onChange={(e) => setNewCustomerCode(e.target.value)}
                required
              />
            </div>
            <div>
              <FormLabel htmlFor="name">Name:</FormLabel>
              <Input
                type="text"
                id="name"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateCustomer}>
              Update
            </Button>
            <Button colorScheme="gray" onClick={handleCancelUpdateCustomer}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isViewingCustomer && selectedCustomerId && (
        <Modal isOpen={isViewingCustomer} onClose={handleViewModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader  color="white" backgroundColor="#67C3D7">View Customer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>
                <FormLabel htmlFor="code">Code:</FormLabel>
                <Input
                  type="text"
                  id="code"
                  value={newCustomerCode}
                  isReadOnly
                />
              </div>
              <div>
                <FormLabel htmlFor="label">Name:</FormLabel>
                <Input
                  type="text"
                  id="name"
                  value={newCustomerName}
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
        </Modal>)}
<>
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
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCustomers?.map((customer:any,index:number) => (
              <Tr
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <Td width="20px">{index+1}</Td>
                <Td width="60px">{customer.code}</Td>
                <Td width="60px">{customer.name}</Td>
                <Td width="20px">
                  <IconButton
                    aria-label="View"
                    icon={<MdVisibility size={16} />}
                    colorScheme="teal"
                    onClick={() => handleView(customer.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Update"
                    icon={<MdEdit size={16} />}
                    colorScheme="blue"
                    onClick={() => handleUpdate(customer.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<MdDelete size={16} />}
                    colorScheme="red"
                    onClick={() => handleDelete(customer.id)}
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
