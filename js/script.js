// Selectors
const menu = document.querySelector('.menu');
const input = document.querySelector('.menu span');
const submenu = document.querySelector('.submenu');
const popular = document.querySelector('.popular');
const resultsTitle = document.querySelector('main h3');
const cards = document.querySelector('.cards');
const pagesList = document.querySelector('.pages ul');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const btnToTop = document.querySelector('.to_top');
const xhr = new XMLHttpRequest();
const zone = ['全區', '楠梓區', '左營區', '鼓山區', '三民區', '苓雅區', '新興區', '前金區', '鹽埕區', '前鎮區', '旗津區', '小港區', '鳳山區', '茂林區', '甲仙區', '六龜區', '杉林區', '美濃區', '內門區', '仁武區', '田寮區', '旗山區', '梓官區', '阿蓮區', '湖內區', '岡山區', '茄萣區', '路竹區', '鳥松區', '永安區', '燕巢區', '大樹區', '大寮區', '林園區', '彌陀區', '橋頭區', '大社區', '那瑪夏區', '桃源區'];
let data;
let singlePageData;
let results;
let str;
let totalPages;
let currentPageNum;
let currentPageLink;

// EventListeners
window.addEventListener('load', addOptions);
window.addEventListener('scroll', toTopReveal);
btnToTop.addEventListener('click', toTop);
menu.addEventListener('click', menuToggle);
submenu.addEventListener('click', renderChoice);
popular.addEventListener('click', renderChoice);
pagesList.addEventListener('click', changePage);
prev.addEventListener('click', prevPage);
next.addEventListener('click', nextPage);

// Functions
function addOptions() {
    str = '';
    zone.forEach(item => {
        str += `
            <li><a href="#">${item}</a></li>
        `;
    });
    submenu.innerHTML = str;
}

function toTop(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toTopReveal() {
    if (window.scrollY <= 300) {
        btnToTop.classList.add('d-none');
    } else {
        btnToTop.classList.remove('d-none');
    } 
}

function menuToggle() {
    if (submenu.classList.contains('height-0')) {
        submenu.classList.remove('height-0');
    }else{
        submenu.classList.add('height-0');
    }
}

function renderChoice(e) {
    if (e.target.nodeName === 'A') {
        e.preventDefault();
        input.innerHTML = e.target.textContent + '<img src="assets/icons_down.png" alt="dropdown arrow">';
        resultsTitle.textContent = e.target.textContent;
        if (e.target.textContent === '全區') {
            results = data;
        }else{
            results = data.filter(item => item.Zone === e.target.textContent);
        }
        renderData();
    }else{
        return
    }
}

function getTotalPage() {
    totalPages = Math.ceil(results.length / 10);
}

function renderPageList() {
    str = '';
    if (totalPages < 7) {
        for (let i = 0; i < totalPages; i++) {
            str += `
                <li><a href="#" data-num="${i+1}">${i+1}</a></li>
            `;
        }
    }else{
        if (currentPageNum < 4) {
            for (let i = 0; i < 7; i++) {
                str += `
                    <li><a href="#" data-num="${i+1}">${i+1}</a></li>
                `;
            }
        }else if (currentPageNum > totalPages - 3){
            for (let i = totalPages - 7; i < totalPages; i++) {
                str += `
                    <li><a href="#" data-num="${i+1}">${i+1}</a></li>
                `;
            }
        }else{
            for (let i = currentPageNum - 4; i < currentPageNum + 3; i++) {
                str += `
                    <li><a href="#" data-num="${i+1}">${i+1}</a></li>
                `;
            }
        }
    }
    pagesList.innerHTML = str;
    currentPageLink = document.querySelector(`[data-num="${currentPageNum}"]`);
    currentPageLink.classList.add('active');
    stylePrevAndNext();
}

function renderData() {
    getTotalPage();
    currentPageNum = 1;
    renderPageList();
    renderPage();
}

function renderPage() {
    singlePageData = [];
    for (let i = (currentPageNum - 1) * 10; i < currentPageNum * 10 && i < results.length; i++) {
        singlePageData.push(results[i]);
    }
    str = '';
    singlePageData.forEach(result => {
        str += `
            <li>
                <div class="card_title" style="background-image:url('${result.Picture1}');">
                    <h2>${result.Name}</h2>
                    <p>${result.Zone}</p>
                </div>
                <ul class="card_details">
                    <li class="card_clock">
                        <img src="assets/icons_clock.png" alt="clock icon">
                        <p>${result.Opentime}</p>
                    </li>
                    <li class="card_location">
                        <img src="assets/icons_pin.png" alt="location icon">
                        <p>${result.Add}</p>
                    </li>
                    <li class="card_phone">
                        <img src="assets/icons_phone.png" alt="phone icon">
                        <p>${result.Tel}</p>
                    </li>
                    <li class="card_tag">
                        <img src="assets/icons_tag.png" alt="tag icon">
                        <p>${result.Ticketinfo}</p>
                    </li>
                </ul>
            </li>
        `;
    });
    cards.innerHTML = str;
}

function changePage(e) {
    if (e.target.nodeName !== 'A') {
        return
    }else if (parseInt(e.target.textContent) === currentPageNum) {
        return
    }else{
        e.preventDefault();
        currentPageLink = document.querySelector('.active');
        currentPageLink.classList.remove('active');
        currentPageNum = parseInt(e.target.textContent);
        currentPageLink = document.querySelector(`[data-num="${currentPageNum}"]`);
        currentPageLink.classList.add('active');
        renderPage();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        renderPageList();
    }
}

function stylePrevAndNext() {
    if (currentPageNum === 1) {
        prev.classList = ('disabled');
    }else{
        prev.classList = ('abled');
    }
    if (currentPageNum === totalPages) {
        next.classList = ('disabled');
    }else{
        next.classList = ('abled');
    }
}

function prevPage(e) {
    if (prev.classList.contains('disabled')) {
        e.preventDefault();
        return
    }else{
        e.preventDefault();
        currentPageNum = currentPageNum - 1;
        currentPageLink = document.querySelector('.active');
        currentPageLink.classList.remove('active');
        currentPageLink = document.querySelector(`[data-num="${currentPageNum}"]`);
        currentPageLink.classList.add('active');
        renderPage();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        renderPageList();
    }
}

function nextPage(e) {
    if (next.classList.contains('disabled')) {
        e.preventDefault();
        return
    }else{
        e.preventDefault();
        currentPageNum = currentPageNum + 1;
        currentPageLink = document.querySelector('.active');
        currentPageLink.classList.remove('active');
        currentPageLink = document.querySelector(`[data-num="${currentPageNum}"]`);
        currentPageLink.classList.add('active');
        renderPage();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        renderPageList();
    }
}

// Get API
xhr.open('get','https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c',true);
xhr.send(null);
xhr.onload = function() {
    if (xhr.status === 200) {
        data = JSON.parse(xhr.responseText).data.XML_Head.Infos.Info;
        data.forEach(dataItem => {
            zone.forEach(zoneItem => {
                if (dataItem.Add.toString().includes(zoneItem)) {
                    dataItem.Zone = zoneItem;
                    return
                }
            });
            if (dataItem.Ticketinfo === '') {
                dataItem.Ticketinfo = '無資訊'
            }
        });
        resultsTitle.textContent = '全區';
        results = data;
        renderData();
    }else{
        alert('資料讀取錯誤');
    }
}