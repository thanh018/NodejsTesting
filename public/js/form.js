
$(document).ready(function() {
    $('#create').off('click').on('click', function(e) {
      var url = '/customer/create';
      getFormData(url, e);
    });

    $('#change').off('click').on('click', function(e) {
      var url = '/detail/';
      getFormData(url, e);
    });

    $('#delete').off('click').on('click', function() {
      var customerId = $.trim($('#customer-id').text());
      var url = "/detail/" + customerId
      $.ajax({
        url: url,
        type: 'PUT',
        data: {
          customerId: customerId
        },
        success: function() {}
      })
    });

    function getFormData(url, e) {
      var firstname = $.trim($('#firstname').val());
      var lastname = $.trim($('#lastname').val());
      var email = $.trim($('#email').val());
      var idNumber = $.trim($('#idNumber').val());
      var phone = $.trim($('#phone').val());
      var address = $.trim($('#address').val());
      var customerId = $.trim($('#customer-id').text());
      if(customerId) {
        url = url + customerId
      }
      var isValid = true;
  
      if(firstname === '') {
        isValid = false;
        $('#errorMsg1').html('<div class="alert alert-danger">Name field is empty</div>');
      } else {
        $('#errorMsg1').html('');
      }
  
      if(lastname === '') {
        isValid = false;
        $('#errorMsg2').html('<div class="alert alert-danger">Address field is empty</div>');
      } else {
        $('#errorMsg2').html('');
      }
  
      if(idNumber === '') {
        isValid = false;
        $('#errorMsg4').html('<div class="alert alert-danger">Country field is empty</div>');
      } else {
        $('#errorMsg4').html('');
      }
      
      if(phone === '') {
        isValid = false;
        $('#errorMsg5').html('<div class="alert alert-danger">Sector field is empty</div>');
      } else {
        $('#errorMsg5').html('');
      }

      if(isValid === true) {
        var data = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          idNumber: idNumber,
          phone: phone,
          address: address,
          customerId: customerId
        }
  
        $.ajax({
          url: url,
          type: 'POST',
          data: data,
          success: function() {
            $('#firstname').val('');
            $('#lastname').val('');
            $('#email').val('');
            $('#idNumber').val('');
            $('#phone').val('');
            $('#address').val('');
          }
        })
      } else {
        e.preventDefault();
        return false;
      }
    }
  });