interface CascaderNames {
  value: string;
  label: string;
  children?: CascaderNames;
}

interface BuildData {
  packageName: string;
  status: string;
}

interface DiffTableItem {
  packageName: string;
  status1: string;
  status2: string;
}

interface CompareRes {
  unique1: Array<BuildData>; 
  unique2: Array<BuildData>; 
  same: Array<BuildData>;    
  diff: Array<DiffTableItem>;
}



export type { BuildData, CompareRes, CascaderNames, DiffTableItem };