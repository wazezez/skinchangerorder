let Order = {
  /**
   * @module       Card
   * @description  Инициализация поиска типа кредитной карты по номеру
   */
  initCardInfo: function () {
    CardInfo.setDefaultOptions({
      banksLogosPath: '/storage/assets/img/banks-logos/',
      brandsLogosPath: '/storage/assets/img/brands-logos/'
    });
    $(document).ready(function(){
      $('.js-credit-card-number').mask("9999 9999 9999 9999", {
        placeholder:" ",
        completed:function() {
          let cardInfo = new CardInfo(this.val());
          $('.js-creditcard-logo').attr('alt',cardInfo.bankName);
          $('.js-creditcard-logo').attr('src',cardInfo.brandLogo);
        }
      });
    });
  },

  /**
   * @module       Mask
   * @description  Инициализация масок
   */
  initMasks: function (){
    $('.js-date-mask').mask("99",{placeholder:" ",});
  },

  /**
   * @module       Handlers
   * @description  Инициализация обработчиков
   */
  initHandlers: function () {
    // ------
    // Обработка клика по кнопке показа формы
    // ------
    $('.js-show-cardform').on('click',function(e){
      e.preventDefault();
      $('.orderform__cardpay').addClass('orderform__cardpay--active');
    });

    // ------
    // Обработка ввода данных в поле ввода почты
    // ------
    $('#order-usermail').on('change keyup',function(){
      if (this.value.length > 1) {
        $('.orderform__creditbutton,.orderform__gpaybutton').prop('disabled',false);
      } else {
        $('.orderform__creditbutton,.orderform__gpaybutton').prop('disabled',true);
      }
    });
    // ------
    // Обработка ввода данных в поле ввода почты
    // ------
    $('.popup__close').on('click',function(){
      let popup = $(this).attr('data-popup');
      $(popup).removeClass('popup-wrapper--visible');
      $('.modal-backdrop').remove();
      $('body').removeClass('modal-open');
    });

    $('[data-open="modal"]').on('click',function () {
      let modal = $(this).attr('data-target');
      $('.popup').removeClass('popup-wrapper--visible');
      $(modal).addClass('popup-wrapper--visible');
    })
  },
  /**
   * @module       Init
   * @description  Инициализация основных модулей
   */
  init: function(){
    this.initHandlers();
    this.initMasks();
    this.initCardInfo();
  }
}
