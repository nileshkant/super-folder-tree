export interface FileStructure {
  type: string;
  name: string;
  id: string;
  files?: FileStructure[] | null;
}
