import { useEffect, useState } from 'react';

export const App = () => {
  const [response, setResponse] = useState<{
    ok: boolean;
  }>({
    ok: false,
  });

  useEffect(() => {
    fetch('/api/v1/auth')
      .then((r) => r.json())
      .then(setResponse);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to wiki!</h1>

        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
          alt="Nx - Smart, Fast and Extensible Build System"
        />
      </div>
      <div>{response.ok}</div>
    </>
  );
};

export default App;
