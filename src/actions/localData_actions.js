export const LOCAL_AUTH_CHECK = 'local_auth_check';

export function LocalAuthCheck(auth_data){

    return {
        type: LOCAL_AUTH_CHECK,
        auth_data
    }
}