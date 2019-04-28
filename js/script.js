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

