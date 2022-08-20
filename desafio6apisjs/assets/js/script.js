const inputConverter = document.querySelector("#inputConverter")
const chooseSelect = document.querySelector("#chooseSelect")
const searchBtn = document.querySelector("#searchingButton")
const pConverter = document.querySelector("#pConverter")

async function getConverter(currency) {
    try {
        const endpoint = ("https://mindicador.cl/api/" + currency);
        const res = await fetch(endpoint);
        const converter = await res.json()
        return converter
    } catch (e) {
        alert(e.message);
    }
}


searchBtn.addEventListener("click", async () => {
    let inputConverter = document.querySelector("#inputConverter").value
    let chooseSelect = document.querySelector("#chooseSelect").value
    let resultado = await getConverter(chooseSelect);
    let pConverter = document.querySelector("#pConverter")
    pConverter.innerHTML = inputConverter / resultado.serie[0].valor
})

function prepararConfiguracionParaLaGrafica(currency) {
    let chooseSelect = document.querySelector("#chooseSelect").value
    const tipoDeGrafica = "line";
    let resultado = await getConverter(chooseSelect)
    // const nombresDeLasMonedas = currency.map((moneda) => currency.serie);
    const titulo = "Gráfico de Valores de" + currency;
    const colorDeLinea = "red";
    // const valores = currency.map((moneda) => {
    //     const valor = moneda.Valor.replace(",", ".");
    //     return Number(valor);
    // });

    const config = {
        type: tipoDeGrafica,
        data: {
            // labels: nombresDeLasMonedas,
            datasets: [
                {
                    label: titulo,
                    backgroundColor:
                        colorDeLinea,
                    // data: valores
                }
            ]
        }
    };
    return config
}

async function renderGrafica() {
    let chooseSelect = document.querySelector("#chooseSelect").value;
    const valores = await getConverter(chooseSelect);
    const config =
        prepararConfiguracionParaLaGrafica(valores);
    const chartDOM = document.getElementById("converterChart");
    new chartDOM(chartDOM, config);
}

renderGrafica();