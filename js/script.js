//focus on the first text field
$('input[type="text"]:first').focus();

//hide the 'other' job role input when the page is loaded
$('#other-title').hide();

//add an event listener to job role menu
$('#title').on('change', event => {
    const $jobRole = $('#title option:selected').val();
    //if an user select 'other', the hidden 'job role' input reveals
    if($jobRole === 'other') {
        $('#other-title').show();
    } else{
        $('#other-title').hide();
    }
});

//add an event listener to T-Shirt Info menu
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
    } 
});
