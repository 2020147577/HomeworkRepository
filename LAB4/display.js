fetch('https://2020147577.github.io/HomeworkRepository/LAB4/product.json')
    .then(function (response) {
        return response.json();
    }).then(function (json) {
        let product = json;
        initialize(product);
    }).catch(function (err) {
        console.log(err.message);
    });

window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        initialize(Allproducts);
    }
}

function initialize(product) {
    const category = document.getElementById('category');
    const textSearch = document.getElementById('textSearch');
    const button = document.getElementById('Search');
    const main = document.querySelector('main');

    let candidate;
    let elected;

    elected = product;
    displayProduct;

    candidate = [];
    elected = [];

    button.onclick = chooseCat;
}

function chooseCat(self) {

    self.preventDefault();

    candidate = [];
    elected = [];

    if (category.value === 'All') {
        candidate = product;
        textCheck;
    }
    else {
        let chosenCat = category.value;
        for (let i = 0; i < product.lenght; i++) {
            if (product[i].type === chosenCat) {
                candidate.push(product[i]);
            }
        }
        textCheck;
    }
}

function textCheck() {
    if (textSearch.value.trim === '') {
        elected = candidate;
        displayProduct;
    }
    else {
        let simpleinput = textSearch.value.trim();

        for (let i = 0; i < candidate.lenght; i++) {
            if (candidate[i].name.indexOf(simpleinput) !== -1) {
                elected.push(candidate[i]);
            }
        }
        displayProduct;
    }
}

function displayProduct() {

    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    if (elected.lenght === 0) {
        const announcement = document.createElement('p');
        announcement.textContent = 'No results!';
        main.appendChild(announcement);
    }

    for (let i = 0; i < elected.lenght; i++) {
        fetch(elected[i].image)
            .then(function (response) {
                return response.blob();
            }).then(function (blob) {
                let url = URL.createObjectURL(blob);
            })

        const division = document.createElement('div');
        const picture = document.createElement('img');
        const instruction = document.createElement('h3');
        const price = document.createElement('p');

        picture.src = url;
        picture.alt = elected[i].name;
        instruction.textContent = 'This is ' + elected[i].name;
        price.textContent = '&#92' + elected[i].price;

        main.appendChild(division);
        division.appendChild(picture);
        division.appendChild(instruction);
        division.appendChild(price);
    }
}