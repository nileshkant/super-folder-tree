import { useState } from "react";
import Box from "../../styles/box";
import GlassCard from "../../styles/glass-card";
import { FileStructure } from "../../types/file-structure";
import Menu from "./tree-map";
import Button, { theme } from "../../styles/button";
import { ThemeProvider } from "styled-components";
import {
  DocumentAdd,
  FolderAdd,
  Edit,
  Delete,
} from "@styled-icons/fluentui-system-regular";

const FileTree = () => {
  const initValue: FileStructure[] = [];
  const [folderTree, setFolderTree] = useState<FileStructure[]>(initValue);
  const [parentNode, setParentNode] = useState<FileStructure>();
  const [selectedFile, setSelectedFile] = useState<FileStructure>();
  const [isEdit, setIsEdit] = useState<FileStructure>();

  /**
   * to update a node in the tree
   * @param node
   * @param nodeId
   * @param newNode
   * @param data
   * @returns node
   */
  function updateObjectArray(
    node: FileStructure,
    nodeId: number | string,
    newNode: FileStructure,
    data: string
  ) {
    if (node.id === nodeId) {
      node.name = data;
    } else if (node.files != null) {
      for (let i = 0; i < node.files.length; i++) {
        updateObjectArray(node.files[i], nodeId, newNode, data);
      }
    }
    return node;
  }
  /**
   * map multiple parent nodes to call updateObjectArray()
   * @param data
   * @param fileId
   * @param newNode
   */
  const fileRename = (
    data: string,
    fileId: number | string,
    newNode: FileStructure
  ) => {
    const updatedData = folderTree.map((node) => {
      return updateObjectArray(node, fileId, newNode, data);
    });
    console.log(updatedData);
  };

  /**
   * insert a new node to the tree
   * @param node
   * @param nodeId
   * @param newNode
   * @returns the updated node
   */
  function insertNodeIntoTree(
    node: FileStructure,
    nodeId: string,
    newNode: FileStructure
  ) {
    if (node.id === nodeId) {
      if (newNode) {
        if (node.files != null) {
          node.files.push(newNode);
        } else {
          node.files = [newNode];
        }
      }
    } else if (node.files && node.files.length > 0) {
      for (let i = 0; i < node.files.length; i++) {
        insertNodeIntoTree(node.files[i], nodeId, newNode);
      }
    }
    return node;
  }

  /**
   * Map a multiple parent nodes to call insertNodeIntoTree()
   * @param type
   */
  function addFolder(type: string) {
    let newNode = {
      id: "",
      name: "",
      type: type,
    };
    if (selectedFile || parentNode) {
      let insertNodeIn =
        selectedFile && selectedFile.type === "folder"
          ? selectedFile
          : parentNode;
      if (insertNodeIn) {
        newNode.id = `${insertNodeIn.id}-${
          insertNodeIn.files ? insertNodeIn.files.length : 0
        }`;
        const insertedData = folderTree.map((node) => {
          return insertNodeIntoTree(node, insertNodeIn!.id, newNode);
        });
        setFolderTree(insertedData);
        setSelectedFile(newNode);
        setParentNode(insertNodeIn);
        setIsEdit(newNode);
      }
    } else {
      newNode.id = `${folderTree.length}`;
      setFolderTree([...folderTree, newNode]);
      setSelectedFile(newNode);
      setParentNode(undefined);
      setIsEdit(newNode);
      console.log(folderTree);
    }
  }

  /**
   * Select a node from the tree
   * @param file
   * @param parentFile
   */
  function selectFile(file: FileStructure, parentFile?: FileStructure) {
    if (selectedFile && selectedFile.id === file.id) {
      setParentNode(undefined);
      setSelectedFile(undefined);
    } else {
      setParentNode(parentFile || undefined);
      setSelectedFile(file);
    }
  }

  /**
   * delete a node from the tree
   * @param node
   * @param nodeId
   * @returns the updated node
   */
  function deleteNodeFromTree(node: FileStructure, nodeId: string) {
    if (node.files != null && node.files.length > 0) {
      for (let i = 0; i < node.files.length; i++) {
        let filtered = node.files.filter((f) => f.id === nodeId);
        if (filtered && filtered.length > 0) {
          node.files = node.files.filter((f) => f.id !== nodeId);
          return node;
        }
        deleteNodeFromTree(node.files[i], nodeId);
      }
    }
    return node;
  }

  /**
   * Map a multiple parent nodes to call deleteNodeFromTree()
   */
  function deleteFileFromTree() {
    if (selectedFile) {
      const updatedTree = folderTree.map((node) => {
        return deleteNodeFromTree(node, selectedFile.id);
      });
      setFolderTree(updatedTree as FileStructure[]);
      setParentNode(undefined);
      setSelectedFile(undefined);
    }
  }

  return (
    <>
      <Box width={[1]} paddingTop={5}>
        <Box display="flex" justifyContent="center">
          <GlassCard>
            <Box padding={20} paddingBottom="5px" color="#ffffff">
              File Structure
              <ThemeProvider theme={theme}>
                <Button
                  color="custom"
                  variant="text"
                  size="small"
                  onClick={() => {
                    addFolder("folder");
                  }}
                >
                  <FolderAdd size={24} />
                </Button>
                <Button
                  color="custom"
                  variant="text"
                  size="small"
                  onClick={() => {
                    addFolder("file");
                  }}
                >
                  <DocumentAdd size={22} />
                </Button>
                <Button
                  color="custom"
                  variant="text"
                  size="small"
                  onClick={() => {
                    setIsEdit(selectedFile);
                  }}
                >
                  <Edit size={22} />
                </Button>
                <Button
                  color="custom"
                  variant="text"
                  size="small"
                  onClick={() => {
                    deleteFileFromTree();
                  }}
                >
                  <Delete size={22} />
                </Button>
              </ThemeProvider>
            </Box>
            <Menu
              files={folderTree}
              onChange={(e, fileId, fileStructure) =>
                fileRename(e, fileId, fileStructure)
              }
              selected={selectFile}
              selectedFile={(selectedFile && selectedFile.id) || ""}
              isEdit={isEdit}
              isFileEditable={() => setIsEdit(undefined)}
            />
          </GlassCard>
        </Box>
      </Box>
    </>
  );
};

export default FileTree;
