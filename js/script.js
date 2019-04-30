
/**
 * 
 * Basic Info Section
 *  
 */
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

/**
 * 
 * T-Shirt Info Section
 *  
 */
//hide the T-shirt 'color' menu when the page is loaded
$('#colors-js-puns').hide();

//add an event listener to T-Shirt Info section
$('#design').on('change', event => {
    //get the value of selected design
    const $theme = $('#design option:selected').val();
    //assign option elements to a variable
    const $colors = $('#color option');

    //show the T-shirt 'color' menu when an user selects a design
    $('#colors-js-puns').show();

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
        $('#colors-js-puns').hide();
    }
});

/**
 * 
 * Register for Activities Info Section
 *  
 */
// create and append element to store the total activity cost
$('.activities').append('<p id="total"></p>');
// create variable to store total cost
let totalCost = 0;

// change event listener for activity section - event delegation is helpful here
$('.activities').on('change', (e) => {
    // variable to store dollar amount of checkbox that was just checked or unchecked
    let cost;
    const $act = $(e.target).parent().text();
    const regexCost = /\$(\d+)$/;

    if($act.match(regexCost) !== null){
        cost = RegExp.$1;
    } 
  
    // variable to store the day and time of checkbox that was just checked or unchecked
    let time;
    const regexTime = /—([\w\d- ]+),/;

    if($act.match(regexTime) !== null){
        time = RegExp.$1;
    };

    // conditional to see if box was checked or unchecked
    if($(e.target).prop('checked')) {
    // if box was checked 
        // add cost to total
        // loop over all checkboxes
        // conditional to see if checkboxes[i] matches day and time of checkbox that was checked and if so, disable checkboxes[i]
        totalCost += parseInt(cost);
        $('.activities label').each(function(index, element) {
            $text =  $(element).text();
            $text.match(regexTime);
            const elementTime = RegExp.$1;
        
            if(elementTime === time) {
                $(element).css('color', 'gray');
                $(element).children().attr('disabled', true);
                $(e.target).attr('disabled', false);
                $(e.target).parent().css('color', '');
            }
        });
    } else {
    // if box was unchecked
        // subtract cost from total
        // loop over all checkboxes
        // conditional to see if checkboxes[i] matches day and time of checkbox that was checked and if so, enable checkboxes[i]
        totalCost -= parseInt(cost);
        $('.activities label').each(function(index, element) {
            $text =  $(element).text();
            $text.match(regexTime);
            const elementTime = RegExp.$1;
        
            if(elementTime === time) {
                $(element).css('color', '');
                $(element).children().attr('disabled', false);
            }
        });
    }

    // lastly, update the cost element to equal the adjusted cost total  
    $('#total').text("Total: $" + totalCost);    
});

/**
 * 
 * Payment Info Section
 *  
 */
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

/**
 * 
 * Form validation
 *  
 */
 //pick elements to check validation
const $nameInput = $('#name');
const $mailInput = $('#mail');
const $actInput = $('.activities legend');
const $cardNumInput = $('#cc-num');
const $zipCodeInput = $('#zip');
const $cvvInput = $('#cvv');

//append error messages to each input section
$('<span>Please enter your name.</span>').insertAfter('#name');
$('<span>Please enter a valid email. ex) example@domain.com</span>').insertAfter('#mail');
$('<span>Please select at least one activity.</span>').insertAfter('.activities legend');
$('<span>Enter between 13 and 16 digit number.</span>').insertAfter('#cc-num');
$('<span>Enter 5-digit number.</span>').insertAfter('#zip');
$('<span>Enter 3-digit number.</span>').insertAfter('#cvv');

//make functions to check if the each section is acceptable
function isValidUsername(username) {
    return /^[a-zA-Z- ]+$/.test(username);
}
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
function isValidCheckbox() {
    console.log($('input[type="checkbox"]:checked').length);
    return $('input[type="checkbox"]:checked').length > 0;
}
function isValidCardNum(number) {
    return /^\d{13,16}$/.test(number);
}
function isValidZipCode(number) {
    return /^\d{5}$/.test(number);
}
function isValidCVV(number) {
    return /^\d{3}$/.test(number);
}

//if the validator argument return false, display error message
//if not, let the page reloaded
function showOrHideError(event, validator, selector) {
    if(!validator(selector.val())) {
        selector.prev().css('color', 'red');
        selector.css('border-color','red');
        selector.next().css('display','inherit');
        event.preventDefault();
    } else {
        selector.prev().css('color', 'initial');
        selector.css('border-color','#c1deeb');
        selector.next().css('display','none');
    }
}

//when the register button is clicked, check validation of all the input section
$('form').on('submit', (event) => {
    showOrHideError(event, isValidUsername, $nameInput);
    showOrHideError(event, isValidEmail, $mailInput);

    if(!isValidCheckbox()) {
        $actInput.css('color', 'red');
        $actInput.next().css('display','inherit');
        event.preventDefault();
    } else {
        $actInput.css('color', '#184f68');
        $actInput.next().css('display','none');
    }
    
    if($('#payment option:selected').val() === 'credit card') {
        showOrHideError(event, isValidCardNum, $cardNumInput);
        showOrHideError(event, isValidZipCode, $zipCodeInput);
        showOrHideError(event, isValidCVV, $cvvInput);
    }
});

//add a real time event listener to the each section for validation check
$nameInput.on('input', (event) => {
    showOrHideError(event, isValidUsername, $nameInput);
});
$mailInput.on('input', (event) => {
    showOrHideError(event, isValidEmail, $mailInput);
});
$cardNumInput.on('input', (event) => {
    showOrHideError(event, isValidCardNum, $cardNumInput);
});
$zipCodeInput.on('input', (event) => {
    showOrHideError(event, isValidZipCode, $zipCodeInput);
});
$cvvInput.on('input', (event) => {
    showOrHideError(event, isValidCVV, $cvvInput);
});