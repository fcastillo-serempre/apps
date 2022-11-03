import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { getEnvVariables } from '@apps/helpers';

import { useAuthStore } from '@apps/store';

const useGoogleSignIn = () => {
  const { googleClientId } = getEnvVariables();
  const { handleLoginWithGoogle, handleLogout, user, status } = useAuthStore();

  const isAuthenticating = status === 'checking';

  const onResponse = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    handleLoginWithGoogle((response as GoogleLoginResponse).tokenId);
  };

  return {
    user,
    googleClientId,
    isAuthenticating,
    // Actions
    handleLogout,
    // Callbacks
    onResponse,
  };
};

export const GoogleSignIn = () => {
  const { onResponse, googleClientId, isAuthenticating } = useGoogleSignIn();

  return (
    <div className="flex flex-col">
      <GoogleLogin
        clientId={googleClientId}
        onSuccess={onResponse}
        onFailure={onResponse}
        // isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      >
        Sign in with Google
      </GoogleLogin>

      {isAuthenticating && <p>Checking...</p>}
    </div>
  );
};
