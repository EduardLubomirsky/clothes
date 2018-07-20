//----компоненты меню
var menu_button = document.getElementsByClassName('hamburger')[0];
var main_navigation = document.getElementsByClassName('main-navigation')[0];
var main_menu_title = document.getElementsByClassName('main-menu-title')[0];
var main_menu_list = document.querySelectorAll('.main-menu li');
//----компоненты корзины
var bag = document.getElementsByClassName('bag')[0];
var bag_list = document.getElementsByClassName('items-in-bag')[0];
var bag_wrap = document.getElementsByClassName('content-right')[0];
//----кнопки слайдера products-list
var button_prew = document.getElementsByClassName('prew-item')[0];
var button_next = document.getElementsByClassName('next-item')[0];
//----карточки слайдера products-list
var slider_card = document.querySelectorAll('.products-list li');

var overlay = document.getElementsByClassName('overlay')[0];
bag.addEventListener('click', function(evt){
	evt.preventDefault();
	bag.classList.toggle('close');
	bag_wrap.classList.toggle('expand');
	overlay.classList.toggle('show')
});
menu_button.addEventListener('click', function(evt){
	evt.preventDefault();
	menu_button.classList.toggle('close');
	main_navigation.classList.toggle('expand');
	overlay.classList.toggle('show');
});

main_menu_title.addEventListener('click', function(evt){
	evt.preventDefault();
	menu_button.classList.toggle('close');
	main_navigation.classList.toggle('expand');
	overlay.classList.toggle('show');
});

overlay.addEventListener('click', function(){
	overlay.classList.remove('show');
	main_navigation.classList.remove('expand');
	menu_button.classList.remove('close');
	bag.classList.remove('close');

});
for(let i = 1; i < main_menu_list.length; i++){
	main_menu_list[i].addEventListener('click', function(evt){
		evt.preventDefault();
		this.classList.toggle('expand');
	});
}



//----реализация слайдера products-list 
//----только для таблеток
var card_to_show = 4;
var card_with = 25.15;
var left = 0.00;
var first_active;
var last_card_position;
var number_of_hidden = 0;


for(let c = 0; c < slider_card.length; c++){
	if(slider_card[c].classList.contains('hidden')){
		number_of_hidden++;
	}
}
for(let i = 0; i < slider_card.length; i++){
	if(slider_card[i].classList.contains('hidden')){
		left-= card_with;
		for(let j = 0; j < slider_card.length; j++)
			slider_card[j].style.left = parseFloat(left).toFixed(2)+'%';
	}
	else{
		first_active = i;
		last_card_position = parseFloat(-(first_active*card_with+((number_of_hidden-first_active)*card_with))).toFixed(2);
		break;	
	}
}
button_next.addEventListener('click', function(evt){
	if(!(parseFloat(left).toFixed(2) == last_card_position)){
		left -= card_with;
		first_active++;

		for(let i = 0; i < slider_card.length; i++){
			slider_card[i].style.left = parseFloat(left).toFixed(2)+'%';
			slider_card[i].classList.add('hidden');
		}
		for(let j = first_active; j < first_active + card_to_show; j++){
			slider_card[j].classList.remove('hidden');
		}
	}
});
button_prew.addEventListener('click', function(evt){
	if(!(parseFloat(left).toFixed(2)==0)){
		left += card_with;
		first_active--;

		for(let i = 0; i < slider_card.length; i++){
			slider_card[i].style.left = parseFloat(left).toFixed(2)+'%';
			slider_card[i].classList.add('hidden');
		}

		for(let j = first_active; j < first_active + card_to_show; j++){
			slider_card[j].classList.remove('hidden');

		}
	}
});
//----