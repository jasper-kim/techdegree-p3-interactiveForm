//focus on the first text field
$('input[type="text"]:first').focus();

//hide the 'other' job role input when the page is loaded
$('#other-title').hide();

//add an event listener to job role section
$('#title').on('change', event => {
    const $jobRole = $('#title option:selected').val();
    //if an user select 'other' as a job role, the hidden 'other' job role input reveals
    if($jobRole === 'other') {
        $('#other-title').show();
    } else{
        $('#other-title').hide();
    }
});

//add an event listener to T-Shirt Info section
$('#design').on('change', event => {
    //get the value of selected design
    const $theme = $('#design option:selected').val();
    //assign option elements to a variable
    const $colors = $('#color option');

    //reset the attributes of color options
    $colors.each(function(){
        $(this).attr('selected', false);
        $colors.show();
    });
    
    //according to the selected design, hide the unnesserary colors 
    //and, set what is displayed in the color select element
    if($theme === 'js puns') {
        $colors.eq(3).hide();
        $colors.eq(4).hide();
        $colors.eq(5).hide();
        
        $colors.eq(0).attr('selected', true);
    } else if($theme === 'heart js') {
        $colors.eq(0).hide();
        $colors.eq(1).hide();
        $colors.eq(2).hide();

        $colors.eq(3).attr('selected', true);
    } else{
        $colors.eq(0).attr('selected', true);
    }
});

//add an event listener to Register for Activities Info section
$('.activities').on('click', (e) => {
    //get the value of name attributes and assign to a variable
    const $name = $(e.target).attr('name');
    //create a variable to contain the sum of costs
    let totalCost = 0;

    //create a function to make competing activities disabled
    function makeDisabled(value) {
        $("input[name='"+value+"']").attr('disabled', true);
        $("input[name='"+value+"']").parent().css('color', 'gray');
    }

    //create a function to restore competing activities to its original state
    function cancelDisabled(value) {
        $("input[name='"+value+"']").attr('disabled', false);
        $("input[name='"+value+"']").parent().css('color', '');
    }

    //set conditional statements to make checkboxes be selectable by conditions
    switch ($name) {
        case 'js-frameworks':
            if($(e.target).is(':checked')) {
                makeDisabled('express');
            } else {
                cancelDisabled('express');
            } 
            break;
        case 'js-libs':
            if($(e.target).is(':checked')) {
                makeDisabled('node');
            } else {
                cancelDisabled('node');
            } 
            break;
        case 'express':
            if($(e.target).is(':checked')) {
                makeDisabled('js-frameworks');
            } else {
                cancelDisabled('js-frameworks');
            } 
            break;
        case 'node':
            if($(e.target).is(':checked')) {
                makeDisabled('js-libs');
            } else {
                cancelDisabled('js-libs');
            } 
            break; 
    }

    //loop through checked elements to find the cost of each activities 
    //and them to the variable totalCost
    $('input:checked').each(function() {
        let string = $(this).parent().text();
        let regex = /\d{3}/;
        let cost = string.match(regex);
        totalCost += parseInt(cost[0]);
    });

    //create a p element to display the total cost of selected activities
    //and append it if the p element is not created before
    //if the element already exists, just update the total
    if($('.activities p').length === 0) {
        const $total = $('<p>Total: $'+ totalCost + '</p>');
        $('.activities').append($total);
    } else {
        $('.activities p').html('<p>Total: $'+ totalCost + '</p>');
    }
    
    //if the total is greater than 0, display the p element
    //otherwise, hide the element
    if(totalCost > 0) {
        $('.activities p').show();
    } else {
        $('.activities p').hide();
    }
});

//add the hidden attribute to "Select Payment Method" option 
//so that an user should select one of payment options
$('#payment option:first').attr('hidden', true);

//make the credit card payment as default option and display only the credit card infomation
$('option[value="credit card"]').attr('selected', true);
$('#credit-card').next().attr('hidden', true);
$('#credit-card').next().next().attr('hidden', true);

//add an event listener to Payment Info section
$('#payment').on('change', (e) => {
    //get the value of value attributes and assign to a variable
    const $payment= $('#payment option:selected').attr('value');
    //set conditional statements to display payment infomation by conditions
    switch($payment) {
        case 'credit card':
            $('#credit-card').attr('hidden', false);
            $('#credit-card').next().attr('hidden', true);
            $('#credit-card').next().next().attr('hidden', true);
            break;
        case 'paypal':
            $('#credit-card').attr('hidden', true);
            $('#credit-card').next().attr('hidden', false);
            $('#credit-card').next().next().attr('hidden', true);
            break;
        case 'bitcoin':
            $('#credit-card').attr('hidden', true);
            $('#credit-card').next().attr('hidden', true);
            $('#credit-card').next().next().attr('hidden', false);
            break;
    }
});

//append error messages to each input section
$('<span>Please, enter your name.</span>').insertAfter('#name');
$('<span>Please, enter a valid email. ex) example@domain.com</span>').insertAfter('#mail');
$('<span>Please, select at least one activity.</span>').insertAfter('.activities legend');
$('<span>Enter between 13 and 16 digit number.</span>').insertAfter('#cc-num');
$('<span>Enter 5-digit number.</span>').insertAfter('#zip');
$('<span>Enter 3-digit number.</span>').insertAfter('#cvv');

//make functions to check each 
function isValidUsername(username) {
    return /^[a-zA-Z_]+$/.test(username);
}
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
function isValidCheckbox() {
    return $('input[type="checkbox"]:checked').length > 0;
}
function isValidCardNum(number) {
    return /\d{13,16}/.test(number);
}
function isValidZipCode(number) {
    return /\d{5}/.test(number);
}
function isValidCVV(number) {
    return /\d{3}/.test(number);
}

//when the register button is clicked, check validation of all the input section
//if all the input valid, let the page reload
//if not, prevent submitting the form and turn the border of input section red, also display error message
$('form').on('submit', (e) => {
     const $nameInput = $('#name');
     const $mailInput = $('#mail');
     const $cardNumInput = $('#cc-num');
     const $zipCodeInput = $('#zip');
     const $cvvInput = $('#cvv');

    function showOrHideError(validator, selector) {
        if(!validator(selector.val())) {
            selector.prev().css('color', 'red');
            selector.css('border-color','red');
            selector.next().css('display','inherit');
            e.preventDefault();
        } else {
            selector.prev().css('color', 'initial');
            selector.css('border-color','#c1deeb');
            selector.next().css('display','none');
        }
    }
     
    showOrHideError(isValidUsername, $nameInput);
    showOrHideError(isValidEmail, $mailInput);

    if(!isValidCheckbox()) {
        $('.activities legend').css('color', 'red');
        $('.activities legend').next().css('display','inherit');
        e.preventDefault();
    } else {
        $('.activities legend').css('color', '#184f68');
        $('.activities legend').next().css('display','none');
    }
    
    if($('#payment option:selected').val() === 'credit card') {
        showOrHideError(isValidCardNum, $cardNumInput);
        showOrHideError(isValidZipCode, $zipCodeInput);
        showOrHideError(isValidCVV, $cvvInput);
    }
});



