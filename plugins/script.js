$(document).ready(function () {
    $("#banners ul").bxSlider({
        auto: true,
        speed: 1000,
        // mode: 'fade'
        // pager: false
    });

    $('#fotos #galeria').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }

    });
    
});

document.querySelector('menu_hamburguer').addEventListener('click', toggleMenu);
document.querySelector('menu_hamburguer').addEventListener('touchstart', toggleMenu);

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM carregado');
      const buttons = document.querySelectorAll('.filter-btn');
      const cards = document.querySelectorAll('.card');
      const subtitles = document.querySelectorAll('.cardapio_subtitulo');

      console.log('Botões encontrados:', buttons.length);
      console.log('Cards encontrados:', cards.length);
      console.log('Subtítulos encontrados:', subtitles.length);

      buttons.forEach(button => {
        button.addEventListener('click', () => {
          console.log('Botão clicado:', button.getAttribute('data-filter'));

          // Remove classe active de todos os botões
          buttons.forEach(btn => btn.classList.remove('active'));
          // Adiciona classe active ao botão clicado
          button.classList.add('active');

          const filter = button.getAttribute('data-filter');

          // Filtra os cards
          cards.forEach(card => {
            const category = card.getAttribute('data-category');
            console.log('Card:', card.querySelector('.card-title').textContent, 'Categoria:', category);
            if (!category) {
              console.warn('Card sem data-category:', card);
              card.classList.add('hidden');
              return;
            }
            if (filter === 'all' || category === filter) {
              card.classList.remove('hidden');
              console.log('Mostrando card:', card.querySelector('.card-title').textContent);
            } else {
              card.classList.add('hidden');
              console.log('Ocultando card:', card.querySelector('.card-title').textContent);
            }
          });

          // Filtra os subtítulos
          subtitles.forEach(subtitle => {
            const category = subtitle.getAttribute('data-category');
            console.log('Subtítulo:', subtitle.textContent, 'Categoria:', category);
            if (!category) {
              console.warn('Subtítulo sem data-category:', subtitle);
              subtitle.classList.add('hidden');
              return;
            }
            if (filter === 'all' || category === filter) {
              subtitle.classList.remove('hidden');
              console.log('Mostrando subtítulo:', subtitle.textContent);
            } else {
              subtitle.classList.add('hidden');
              console.log('Ocultando subtítulo:', subtitle.textContent);
            }
          });

          // Filtra os contêineres de imagens
          const cardapioImagens = document.querySelectorAll('.cardapio_imagens');
          cardapioImagens.forEach(container => {
            const cardsInContainer = container.querySelectorAll('.card');
            let hasVisibleCard = false;
            cardsInContainer.forEach(card => {
              if (!card.classList.contains('hidden')) {
                hasVisibleCard = true;
              }
            });
            console.log('Contêiner visível:', hasVisibleCard, 'Antes do subtítulo:', container.previousElementSibling.textContent);
            container.classList.toggle('hidden', !hasVisibleCard);
          });

          // Força atualização do DOM
          document.getElementById('cardapio').style.display = 'none';
          setTimeout(() => {
            document.getElementById('cardapio').style.display = 'block';
          }, 0);
        });
      });
    });