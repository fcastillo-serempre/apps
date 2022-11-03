import { useAuthStore } from '@apps/store';
import { Button, Typography } from '@apps/ui-library';

export const Login = () => {
  const { handleLogin, status, errorMessage } = useAuthStore();

  return (
    <>
      <Typography variant="h3">Welcome to wiki!</Typography>

      <Button
        onClick={() => {
          handleLogin({
            password: '123456',
            email: 'fcastillo@serempre.com',
          });
        }}
        disabled={status === 'checking'}
      >
        {status === 'checking' ? 'Checking...' : 'Login'}
      </Button>

      <Typography className="text-teal-500 underline" variant="h5">
        {status}
      </Typography>

      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};
