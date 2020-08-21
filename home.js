// Created Container Div
let container = document.createElement('div');
container.classList.add('container', 'pt-4');
container.id = 'container';

let headerDiv = createHeader();
let navBar = createNavBar();

container.append(headerDiv, navBar);
document.body.append(container);



/**
 * Function to create header
 */
function createHeader(){
    let headerDiv = document.createElement('div');
    headerDiv.classList.add('row', 'd-flex', 'justify-content-center');
    headerDiv.style = 'font-weight:bold ; font-size:75px;'
    headerDiv.innerText = 'THE  PERTINENT  TIMES';
    
    return headerDiv;
}

/**
 * Function to create NAVBAR
 */
function createNavBar(){
    let navRowDiv = document.createElement('div');
    navRowDiv.classList.add('row', 'mb-4', 'mt-3');

    let navColDiv = document.createElement('div');
    navColDiv.classList.add('col');

    let navBar = document.createElement('nav');
    navBar.setAttribute('class', 'navbar navbar-expand-lg navbar-light bg-light');

    let allSectionDiv = document.createElement('div');
    allSectionDiv.setAttribute('class', 'collapse navbar-collapse');
    allSectionDiv.setAttribute('id', 'navbarNav');

    let list = document.createElement('ul');
    list.classList.add('navbar-nav');

    let home = createHomeSection();
    let world = createNavSection('WORLD', 'world.html', 'world');
    let politics = createNavSection('POLITICS', 'politics.html', 'politics');
    let magazine = createNavSection('MAGAZINE', 'magazine.html', 'magazine');
    let technology = createNavSection('TECHNOLOGY', 'technology.html', 'technology');
    let science = createNavSection('SCIENCE', 'science.html', 'science');

    let health = createNavSection('HEALTH', 'health.html', 'health');
    let sports = createNavSection('SPORTS', 'sports.html', 'sports');
    let arts = createNavSection('ARTS', 'arts.html', 'arts');
    let fashion = createNavSection('FASHION', 'fashion.html', 'fashion');
    let food = createNavSection('FOOD', 'food.html', 'food');
    let travel = createNavSection('TRAVEL', 'travel.html', 'travel');

    

    list.append(home, world, politics, magazine, technology, science, health, sports, arts, fashion, food, travel);
    allSectionDiv.append(list);
    navBar.append(allSectionDiv);

    navColDiv.append(navBar);
    navRowDiv.append(navColDiv);
    return navRowDiv;
}

/**
 * Function to create Home Section
 */
function createHomeSection() {
    let homeLi = document.createElement('li');
    homeLi.classList.add('nav-item-active', 'nav-item-custom');
    homeLi.id = 'home';
    homeLi.name = 'home';

    let section= document.createElement('a');
    section.setAttribute('class', 'nav-link');
    section.href = 'index.html';
    section.innerText = 'HOME';

    let span = document.createElement('span');
    span.classList.add('sr-only');
    span.innerText = '(current)';

    section.appendChild(span);
    homeLi.appendChild(section);
    return homeLi;

}

/**
 * Function to create nav bar section
 */
function createNavSection(navName, navUrl, id) {
    let listItem = document.createElement('li');
    listItem.classList.add('nav-item', 'nav-item-custom');
    listItem.id = id;
    listItem.name = id;

    let section= document.createElement('a');
    section.setAttribute('class', 'nav-link');
    section.href = navUrl;
    section.innerText = navName;

    listItem.addEventListener('click', function() {
        let clickedNavItem = document.getElementsByClassName('clicked-nav-item')[0];
        console.log(clickedNavItem.value);
        clickedNavItem.classList.remove('clicked-nav-item');
        listItem.classList.add('clicked-nav-item');
    })

    listItem.appendChild(section);
    return listItem;   
}

/**
 * Function to fetch data from NewYork Times API and use it to show news content
 * @param {sectionName} sectionName 
 */
async function createNewsPageBody(sectionName){
    try{
        let url = `https://api.nytimes.com/svc/topstories/v2/${sectionName}.json?api-key=zLJNfGmv2bogN9r0oYxnbi9AtPUL20vA`;
        let data = await fetch(url);
        let finalData = await data.json();
        let result = finalData.results;
        console.log('finalData is : '+ finalData.results);

        for(let i=0; i<result.length; i++){
            let card = createCard(result[i]);
            document.getElementById('container').appendChild(card);
        }


        //return finalData
    }

    catch(err){
        console.log(err);
    }
 
}

/**
 * Function to create Card
 */
function createCard(result){
    let rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'border', 'border-grey', 'mb-3');

    let col1Div = document.createElement('div');
    col1Div.setAttribute('class', 'col-md-8');
    let cardBodyDiv = createCardBodyDiv(result);
    col1Div.append(cardBodyDiv);

    let col2Div = createCardImageCol(result);

    rowDiv.append(col1Div, col2Div);
    return rowDiv;
}

function createCardBodyDiv(result) {
    let cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    let sectionName = document.createElement('h4');
    sectionName.classList.add('card-title','sectioncard', 'text-primary');
    sectionName.setAttribute('name', 'sectioncard');
    let sectionText = result.section;
    if(sectionText === 'us') {
        sectionText = result.subsection;
    }
    sectionText = (sectionText.charAt(0).toUpperCase()) + sectionText.split('').slice(1).join('');
    sectionName.innerText = sectionText;

    let newsTitle = document.createElement('p'); 
    newsTitle.classList.add('card-text', 'titlecard', 'h4');;
    newsTitle.setAttribute('name', 'titlecard');
    newsTitle.innerText = result.title;

    let date = document.createElement('p');
    date.classList.add('card-text', 'datecard');
    date.setAttribute('name', 'datecard');

    let dateText = document.createElement('small');
    dateText.setAttribute('style', 'font-size:20px');
    dateText.classList.add('text-muted');

    let dateObject = new Date(Date.parse(result.created_date));
    dateText.innerText =  dateObject.toLocaleString('default', { month: 'short' }) + " " + dateObject.getDate();
    date.append(dateText);

    let newsAbstract = document.createElement('p');
    newsAbstract.classList.add('card-text', 'abstractcard');
    newsAbstract.setAttribute('name', 'abstractcard');
    newsAbstract.innerText = result.abstract;

    let writtenBy = document.createElement('p');
    writtenBy.classList.add('card-text');
    
    let writtenByText = document.createElement('small');
    writtenByText.setAttribute('style', 'font-size:13px');
    writtenByText.classList.add('text-muted');

    writtenByText.innerText = result.item_type  + " " + result.byline;
    writtenBy.append(writtenByText);


    let continueReading = document.createElement('a');
    continueReading.classList.add('card-text', 'continueReading');
    continueReading.setAttribute('href',result.url);
    continueReading.innerText = 'Continue Reading';


    cardBodyDiv.append(sectionName, newsTitle, date, newsAbstract, writtenBy, continueReading);
    return cardBodyDiv;
}

function createCardImageCol(result) {
    let col2Div = document.createElement('div');
    col2Div.classList.add('col-md-4');

    let image = document.createElement('img');
    image.classList.add('card-img', 'img-thumbnail', 'img-fluid');
    image.setAttribute('src', result.multimedia[4].url);
    image.setAttribute('alt', 'Article Image');

    

    col2Div.appendChild(image);
    return col2Div;
}

