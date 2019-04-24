//focus on the first text field
$('input[type="text"]:first').focus();

//hide the 'other' job role input when the page is loaded
$('#other-title').hide();

//add an event listener to title select menu
$('#title').on('change', event => {
    const jobRole = $('#title option:selected').val();
    //if an user select 'other', the hidden 'job role' input reveals
    if(jobRole === 'other') {
        $('#other-title').show();
    } else{
        $('#other-title').hide();
    }
});
