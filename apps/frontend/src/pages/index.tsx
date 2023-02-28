import { Calculator } from '../components/calculator';
import { useCalculator } from '../hooks/use-calculator';

export default function Page() {
  return <Calculator useCalculator={useCalculator} />;
}
