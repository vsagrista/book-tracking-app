
// Functions to create widgets

export const fadeInAndOut = () => {
  let alertMessage = document.getElementById('success-message');
  alertMessage.classList.remove('success-animate');
  alertMessage.className = 'success-animate';
  setTimeout(() => {
    alertMessage.classList.remove('success-animate');
    alertMessage.className = 'hide';
  }, 2000);
}

export const successMessageHtml = () => {
  var successMessage = document.createElement('div');
  successMessage.className = 'hide';
  successMessage.id = 'success-message';
  successMessage.innerHTML = '<i className="fa fa-check"></i>Success!'
  return successMessage;
}

export const showAlert = (type) => {
  switch (type) {
    case 'success':
      document.getElementById('root').appendChild(successMessageHtml());
      fadeInAndOut('success-message', 'success-animate');
      break; // here we can add more cases e.g. error
    default:
      return;
  }
}