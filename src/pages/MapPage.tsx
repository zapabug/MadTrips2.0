import { FunchalMap } from '../components/home/FunchalMap';

export function MapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Bitcoin Map of Madeira</h1>
      <FunchalMap />
    </div>
  );
} 