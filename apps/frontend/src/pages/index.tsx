import Head from 'next/head';
import { Calculator } from '../components/calculator';
import { useCalculator } from '../hooks/use-calculator';

export default function Page() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles/index.css" />
      </Head>
      <Calculator useCalculator={useCalculator} />
    </>
  );
}
