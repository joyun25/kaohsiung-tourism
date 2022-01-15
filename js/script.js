// Selector
const menu = document.querySelector('.menu');
const input = document.querySelector('.menu span');
const submenu = document.querySelector('.submenu');
const btns = document.querySelector('.btns');
const resultsTitle = document.querySelector('main h3');
const cards = document.querySelector('.cards');
const ToTop = document.querySelector('.to_top');
let keyword;
let data;

let xhr = new XMLHttpRequest();
xhr.open('get','https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c',true);
xhr.send(null);
xhr.onload = function() {
    if (xhr.status == 200) {
        data = JSON.parse(xhr.responseText).data.XML_Head.Infos.Info;

        // Event Listener
        // --Input Toggle
        menu.addEventListener('click', () => {
            if (submenu.classList.contains('height-0')) {
                submenu.classList.remove('height-0');
            }else{
                submenu.classList.add('height-0');
            }
        });

        // --Input Click
        submenu.addEventListener('click', e => {
            if (e.target.nodeName == 'A') {
                e.preventDefault();
                input.innerHTML = e.target.textContent + '<img src="assets/icons_down.png" alt="dropdown arrow">';
                keyword = e.target.textContent;
                renderData();
            }else{
                return
            }
        });

        // --Popular
        btns.addEventListener('click', e => {
            if (e.target.nodeName == 'A') {
                e.preventDefault();
                keyword = e.target.textContent;
                renderData();
            }else{
                return
            }
        });

        function renderData() {
            resultsTitle.textContent = keyword;
            let results = data.filter(item => item.Add.toString().includes(keyword));
            let str = '';
            results.forEach(result => {
                if (result.Ticketinfo == '') {
                    result.Ticketinfo = '無資訊'
                }
                str += `
                    <li>
                        <div class="card_title" style="background-image:url('${result.Picture1}');">
                            <h2>${result.Name}</h2>
                            <p>${keyword}</p>
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
            // if (results.length > 6) {
                // 改for迴圈
            // }
        }
    }else{
        alert('資料讀取錯誤');
    }
}

ToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
})