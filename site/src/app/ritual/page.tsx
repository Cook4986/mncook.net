import type { Metadata } from 'next';
import RitualExperience from './RitualExperience';

export const metadata: Metadata = {
  title: 'Ritual — M.N. Cook',
  description: 'Current investigations, strange evidence, experiments, and recurring signs.',
};

export default function RitualPage() {
  return <RitualExperience />;
}
