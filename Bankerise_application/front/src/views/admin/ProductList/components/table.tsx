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
  fetchProductLists,
  createProductList,
  updateProductList,
  deleteProductList,
} from "store/ProductList/ProductListActions";

export interface ProductList {
  id: number;
  code: string;
  name: string;
}

const Table: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingProductList, setIsAddingProductList] = useState(false);
  const [isUpdatingProductList, setIsUpdatingProductList] = useState(false);
  const [newProductListCode, setNewProductListCode] = useState("");
  const [newProductListName, setNewProductListName] = useState("");
  const [selectedProductListId, setSelectedProductListId] = useState<number | null>(null);

  const productLists = useSelector((state: any) => state?.productLists?.productLists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductLists() as any);
  }, [dispatch]);

  const handleDelete = (productListId: string) => {
    dispatch(deleteProductList(productListId) as any);
  };

  const handleView = (productListId: number) => {
    console.log(`Voir la liste de produits avec l'ID ${productListId}`);
  };

  const handleUpdate = (productListId: number) => {
    setSelectedProductListId(productListId);
    setIsUpdatingProductList(true);
    const selectedProductList = productLists.find((productList: ProductList) => productList.id === productListId);
    if (selectedProductList) {
      setNewProductListCode(selectedProductList.code);
      setNewProductListName(selectedProductList.name);
    }
  };

  const handleAddProductList = () => {
    setIsAddingProductList(true);
  };

  const handleCancelAddProductList = () => {
    setIsAddingProductList(false);
    setNewProductListCode("");
    setNewProductListName("");
  };

  const handleCancelUpdateProductList = () => {
    setIsUpdatingProductList(false);
    setSelectedProductListId(null);
    setNewProductListCode("");
    setNewProductListName("");
  };

  const handleSaveProductList = () => {
    const newProductList: ProductList = {
      id: productLists.length + 1,
      code: newProductListCode,
      name: newProductListName,
    };
    dispatch(createProductList(newProductList) as any);
    setIsAddingProductList(false);
    setNewProductListCode("");
    setNewProductListName("");
  };

  const handleUpdateProductList = () => {
    if (selectedProductListId) {
      const updatedProductList: ProductList = {
        id: selectedProductListId,
        code: newProductListCode,
        name: newProductListName,
      };
      dispatch(updateProductList(updatedProductList) as any);
      setIsUpdatingProductList(false);
      setSelectedProductListId(null);
      setNewProductListCode("");
      setNewProductListName("");
    }
  };

  const filteredProductLists = productLists?.filter((productList: ProductList) =>
    productList.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal isOpen={isAddingProductList} onClose={handleCancelAddProductList}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                value={newProductListCode}
                onChange={(e) => setNewProductListCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newProductListName}
                onChange={(e) => setNewProductListName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveProductList}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancelAddProductList}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isUpdatingProductList} onClose={handleCancelUpdateProductList}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                value={newProductListCode}
                onChange={(e) => setNewProductListCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newProductListName}
                onChange={(e) => setNewProductListName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateProductList}>
              Update
            </Button>
            <Button colorScheme="gray" onClick={handleCancelUpdateProductList}>
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
            onClick={handleAddProductList}
            backgroundColor="#67C3D7"
          >
            Add Product List
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
            {filteredProductLists?.map((productList: any) => (
              <Tr
                key={productList.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <Td width="20px">{productList.id}</Td>
                <Td width="60px">{productList.code}</Td>
                <Td width="60px">{productList.name}</Td>
                <Td width="20px">
                  <IconButton
                    aria-label="View"
                    icon={<MdVisibility size={16} />}
                    colorScheme="teal"
                    onClick={() => handleView(productList.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Update"
                    icon={<MdEdit size={16} />}
                    colorScheme="blue"
                    onClick={() => handleUpdate(productList.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<MdDelete size={16} />}
                    colorScheme="red"
                    onClick={() => handleDelete(productList.id)}
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
