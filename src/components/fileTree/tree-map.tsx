import List, { ListItem } from "../../styles/list";
import { FileStructure } from "../../types/file-structure";
import { Editable } from "../editable-content";
import Box, { SpanBox } from "../../styles/box";

interface TreeArg {
  files: FileStructure[];
  onChange: (e: string, fileId: number | string, file: FileStructure) => void;
  selected: (file: FileStructure, parentFile?: FileStructure) => void;
  selectedFile: string;
  isEdit: FileStructure | undefined;
  isFileEditable: () => void;
}
const Menu = ({
  files,
  onChange,
  selected,
  selectedFile,
  isEdit,
  isFileEditable,
}: TreeArg) => {
  const listItem = (files: FileStructure[], parentFile?: FileStructure) => {
    return (
      <List>
        {files.map((file) => (
          <ListItem key={file.id} fontSize={20} cursor="pointer">
            <SpanBox
              background={selectedFile === file.id ? "#444444" : "transparent"}
              icon={file.type === "folder" ? "📁" : "📄"}
              padding={1}
              display="block"
              onClick={() => {
                selected(file, parentFile);
              }}
            >
              <Editable
                content={file.name}
                onChange={(e: string) => {
                  onChange(e, file.id, file);
                }}
                isEditable={isFileEditable}
                placeholder={"Enter Name"}
                isEdit={(isEdit && isEdit.id === file.id) || false}
              />
            </SpanBox>

            {file.files && file.files.length > 0 && listItem(file.files, file)}
          </ListItem>
        ))}
      </List>
    );
  };
  return (
    <Box paddingRight={20} paddingBottom={20} paddingTop={20} color="#ffffff">
      {listItem(files)}
    </Box>
  );
};

export default Menu;
