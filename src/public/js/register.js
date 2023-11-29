function sendDataRegister(url, data) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log('Response:', data))
    .catch((error) => console.error('Error:', error));
}
const formRegister = document.getElementById('formRegister'); // Changed to getElementById

formRegister.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the form from submitting in the traditional way

  const inputFisrtName = document.getElementById('userFirstName').value;
  const inputLastName = document.getElementById('lastName').value;
  const inputAge = document.getElementById('userAge').value;
  const inputEmail = document.getElementById('userEmail').value;
  const inputPassword = document.getElementById('userPassword').value;
  const inputConfirmPassword = document.getElementById(
    'userConfirmPassword'
  ).value;

  let data = {
    firstName: inputFisrtName,
    lastName: inputLastName,
    email: inputEmail,
    age: inputAge,
    password: inputPassword,
    confirmPassword: inputConfirmPassword,
  };

  console.log('data', data);
  // Send data to a server using POST
  sendDataRegister('http://localhost:8080/api/users', data);
});
