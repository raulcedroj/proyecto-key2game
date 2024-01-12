document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('button-pedidos').addEventListener('click', function () {
        window.location.href = '#';
    });

    document.getElementById('copiar').addEventListener('click', function () {
        let codigo = document.getElementById('codigo');

        codigo.select();
        codigo.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(codigo.value);

    });

});