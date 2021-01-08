import { GoogleLogin } from 'react-google-login'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

const LoginGoogleButton = () => {
    const onSuccess = (res: any) => {
        console.log('profileObj =>', res)
    }
    const onFailure = (res: any) => {
        console.log('ress =>', res)
    }

    if (clientId) {
        return (

            <GoogleLogin
                render={renderProps => (
                    <button className="flex justify-between items-center bg-gray-100 rounded-full py-1 px-4" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <img className="w-10 h-10 mr-4" src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png" alt="" />
                        <b className="text-blue-600">Connexion avec Google</b>
                    </button>
                )}
                clientId={clientId}
                buttonText="Connexion avec Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn
            />
        )
    }

    return null
}

export default LoginGoogleButton