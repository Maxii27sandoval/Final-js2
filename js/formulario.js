const btn = document.getElementById('button');

document.getElementById('form')
.addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Sending...';

const serviceID = 'default_service';
const templateID = 'template_zye5gja';

    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
        btn.value = 'Send Email';
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu mensaje se envío correctamente',
            showConfirmButton: false,
            timer: 2000
        })
    }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
    });
});


