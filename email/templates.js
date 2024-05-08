const welcomeEmail = (email) => {
  return {
    subject: `Welcome to We-Learn`,
    content: `<div>
                <h4>Welcome ${email}</h4>
                <p>Thank you for signing up!</p>
            </div>`,
  };
};

const accountDelete = (email) => {
  return {
    subject: `Account deleted`,
    content: `<div>
                <h1>Sorry to see you go ${email}</h1>
                <p>Your account is deleted!</p>
            </div>`,
  };
};

const userDetailsUpdate = () => {
  return {
    subject: `Details updated`,
    content: `<div>
                    <h4>Your personal details have been successfully changed</h4>
                    </div>`,
  };
};

const contactForm = (message) => {
  return {
    subject: `We-Learn enquiry email`,
    content: `<div>
              <p>${message}</p>
              </div>`,
  };
};

module.exports = { welcomeEmail, accountDelete, contactForm };
