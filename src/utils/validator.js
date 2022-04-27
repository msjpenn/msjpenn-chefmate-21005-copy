const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isValidPhoneNumber = (phoneNumber) => {
    const re = /^[0-9]{12,13}$/;
    return re.test(phoneNumber);
}

export {isValidEmail, isValidPhoneNumber}