let Order = {

  init: function(){
    $('.js-date-mask').mask("99",{placeholder:" ",});
    $('.js-cvv-mask').mask("999",{placeholder:" ",});
    CardInfo.setDefaultOptions({
      banksLogosPath: '/images/banks-logos/',
      brandsLogosPath: '/images/brands-logos/'
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

    $('.js-show-cardform').on('click',function(e){
      e.preventDefault();
      $('.orderform__cardpay').addClass('orderform__cardpay--active');
    });

    $('#order-usermail').on('change keyup',function(){
      if (this.value.length > 1) {
        $('.orderform__creditbutton,.orderform__gpaybutton').prop('disabled',false);
      } else {
        $('.orderform__creditbutton,.orderform__gpaybutton').prop('disabled',true);
      }
    })
  }
}
