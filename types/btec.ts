
export type Level = 'P' | 'M' | 'D';

export interface Criteria {
  id: string;
  description: string;
  level: Level;
  weight: number; // Percentage out of 100
}

export interface TaskSubmission {
  taskId: number;
  studentName: string;
  taskContent: string;
  evidenceUrls: string[];
  criteria: Criteria[];
}

export interface ChainOfThoughtStruct {
  taskUnderstanding: string[];
  criteriaAnalysis: Record<string, string>;
  strengthsWeaknesses: { 
    strengths: string[]; 
    weaknesses: string[]; 
  };
  scoring: Record<string, number>;
}

export interface EvaluationResult {
  taskId: number;
  studentName: string;
  score: number; // 0..100
  isPass: boolean;
  feedback: string;
  plagiarismCheck: {
    similarityScore: number;
    sources: string[];
    isPlagiarized: boolean;
  };
  chainOfThought: ChainOfThoughtStruct;
  predictiveAnalysis: { 
    confidence: number; 
    recommendations: string[]; 
    learningPath: string[]; 
  };
  jordanianContextNotes: string[];
  hash: string; // SHA-256 hash
  timestamp: Date;
  version: string; // e.g., 'AAQ-2025'
}
