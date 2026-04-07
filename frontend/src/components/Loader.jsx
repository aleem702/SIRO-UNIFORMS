import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: '#000', fontWeight: 'bold' }}>{progress.toFixed(0)}%</div>
    </Html>
  );
}
