import { create } from 'zustand';
import type { EvaluationResult, TaskSubmission } from '../types/btec';

interface BTECEvaluatorState {
  currentSubmission: TaskSubmission | null;
  evaluationResult: EvaluationResult | null;
  isLoading: boolean;
  error: string | null;
  setSubmission: (submission: TaskSubmission) => void;
  startEvaluation: () => void;
  setEvaluationResult: (result: EvaluationResult) => void;
  setError: (e: string) => void;
  clear: () => void;
}

export const useBTECEvaluatorStore = create<BTECEvaluatorState>((set) => ({
  currentSubmission: null,
  evaluationResult: null,
  isLoading: false,
  error: null,
  setSubmission: (submission) => set({ currentSubmission: submission, error: null }),
  startEvaluation: () => set({ isLoading: true, error: null, evaluationResult: null }),
  setEvaluationResult: (result) => set({ evaluationResult: result, isLoading: false }),
  setError: (e) => set({ error: e, isLoading: false }),
  clear: () => set({ 
    currentSubmission: null, 
    evaluationResult: null, 
    isLoading: false, 
    error: null 
  })
}));
