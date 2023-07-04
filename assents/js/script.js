const form = document.querySelector('form');
const input = document.querySelector('.input');
const span = document.getElementById('span');

input.addEventListener('input', (event) => {
    let cpf = event.target.value;
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.slice(0, 11);

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    event.target.value = cpf;
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const api = 'https://api-cpf.vercel.app/cpf/valid/' + input.value;
    fetch(api)
    .then(resposta => {
        return resposta.json();
    }).then(corpo => {
        input.classList.add("active");
        span.classList.add("active");
        input.classList.remove("valid", "invalid");
        span.classList.remove("valid", "invalid");
        if (corpo.Valid) {
            span.innerHTML = "Válido";
            input.classList.add("valid");
            span.classList.add("valid");
        } else {
            span.innerHTML = "Inválido";
            input.classList.add("invalid");
            span.classList.add("invalid");
        }
    }).catch(e => {
        span.innerHTML = "";
        input.classList.remove("active","valid", "invalid");
        span.classList.remove("active","valid", "invalid");
    });
});
