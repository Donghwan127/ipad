import ipads from '../data/ipads.js'
//ipads는 배열 데이터가 됨
import navigations from '../data/navigations.js'

//장바구니

const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click',function(event){
  event.stopPropagation()
  // window를 클릭함으로써 show 클래스가 없어지는 것을 방지함. 위로 전파되는 것을 막음.
  if(basketEl.classList.contains('show')) {
    hideBasket()
  }
  else {
    showBasket()
  }
})

basketEl.addEventListener('click',function(event){
  event.stopPropagation()
})

window.addEventListener('click', function(){
  hideBasket()
})

function showBasket() {
  basketEl.classList.add('show')
}

function hideBasket() {
  basketEl.classList.remove('show')
}

// 검색

const headerEl = document.querySelector('header')
const headerMenuEls = [...document.querySelectorAll('ul.menu > li')]
// ... 전개 연산자를 통해 요소들 해체 가능. 얕은 복사, 배열로 관리
const searchWrapEl = headerEl.querySelector('.search-wrap') 
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]


searchStarterEl.addEventListener('click',showSearch)
searchCloserEl.addEventListener('click',hideSearch)
searchShadowEl.addEventListener('click',hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  // documentElement는 HTML 내에 있는 최상단 코드를 의미. 즉 HTML tag를 의미한다
  headerMenuEls.reverse().forEach(function(el,index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function(el,index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  setTimeout(function(){
    searchInputEl.focus()
  }, 600)
  // 600ms 후에 실행되도록 함
}

function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function(el,index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function(el,index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  // 다시 원래대로 되돌려줌
  searchInputEl.value = ''
}

//요소의 가시성 관찰

const io = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show');
  })
})

const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function(el) {
  io.observe(el)
})

//비디오 재생

const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click',function(){
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click',function(){
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})

// 당신에게 맞는 iPad는? 랜더링

const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function(ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')
  
  let colorlist = ''
  ipad.colors.forEach(function(color) {
    colorlist += `<li style="background-color:${color};"></li>`
  })
  
  
  itemEl.innerHTML = /* html */`  

  <div class='thumbnail'>
    <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
  </div>
  <ul class="colors">
    ${colorlist}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})

const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function(map){
    mapList += /*html*/ `
    <li>
      <a href="${map.url}">${map.name}</a>
    </li>
    `
  })

  mapEl.innerHTML = /*html*/`
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)  

})

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()