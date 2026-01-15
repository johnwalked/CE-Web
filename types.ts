
export interface Product {
  id: string;
  name: string;
  brand: 'Yuchai' | 'Weichai' | 'Yunnei' | 'Cummins' | 'Perkins' | 'Kefo' | 'CE Power' | 'MTU' | 'Volvo' | 'Hanma' | 'Kohler' | 'Jichai' | 'United Power' | 'Last' | 'Other';
  type: 'Generator' | 'Pump';
  powerKW: number;
  stock: number;
  imageUrl: string;
  specs: {
    maxPower: string;
    powerFactor: string;
    phase: string;
    cooling: string;
    fuelConsumption: string;
    noiseLevel: string;
    dimensions: string;
    weight: string;
  };
  description: string;
}

// Added Task interface to fix import error in TaskManager.tsx
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
  dueDate?: string;
}

export enum Tab {
  ALL = 'all',
  CE_POWER = 'CE Power',
  WEICHAI = 'Weichai',
  YUCHAI = 'Yuchai',
  YUNNEI = 'Yunnei',
  CUMMINS = 'Cummins',
  PERKINS = 'Perkins',
  KEFO = 'Kefo',
  MTU = 'MTU',
  VOLVO = 'Volvo',
  HANMA = 'Hanma'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  images?: string[]; // base64
  isThinking?: boolean;
  groundingUrls?: Array<{ title: string, uri: string }>;
}

export interface ImageGenerationConfig {
  resolution: '1K' | '2K' | '4K';
  aspectRatio: '1:1' | '16:9' | '4:3';
}

export type Language = 'en' | 'am' | 'zh' | 'ti' | 'om';
