interface DiffItem {
  "Project Name": string;
  "Repo Name": string;
  "Success Rate": number;
  Total: number;
  Succeeded: number;
  Failed: number;
  Unresolvable: number;
  addition: string;
}

interface Summary {
  date: string;
  data: {
    category: string;
    success: number;
    total: number;
    successRate: number;
  }[];
  total: number;
}

export type { DiffItem, Summary };
