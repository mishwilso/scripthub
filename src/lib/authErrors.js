export function getAuthErrorMessage(error) {
    const errorMessages = {
        "invalid_credentials": "Incorrect email or password. Please try again.",
        "user_not_found": "No account found with this email. Please sign up.",
        "too_many_requests": "Too many login attempts. Please wait and try again later.",
        "network_error": "Network error occurred. Please check your connection and try again.",
        "internal_server_error": "An unexpected error occurred. Please try again later.",
        "invalid_email": "The email address is not valid. Please check and try again.",
        "weak_password": "The password is too weak. Please choose a stronger password.",
        "email_already_in_use": "This email is already associated with an account. Please log in.",
        "expired_token": "Your session has expired. Please log in again.",
        "invalid_token": "Invalid session token. Please log in again.",
        "access_denied": "You do not have permission to access this resource.",
        "provider_error": "An error occurred with the authentication provider. Please try again.",
    }

    console.log("Auth error code:", error.code);
    return errorMessages[error.code] || "An unknown error occurred. Please try again.";

}