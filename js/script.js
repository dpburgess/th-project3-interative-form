const $designOption = $('#design');
const $colorOption = $('#color');
const jsPunsClr = ['Cornflower Blue', 'Dark Slate Grey', 'Gold'];
const loveJsClr = ['Tomato', 'Steel Blue', 'Dim Grey'];

$(document).ready(function() {
    $('#name').focus()
    $('#other-title').hide();

    clearOptions();

    $designOption.change(function() {
        // add a function here that clears the previous options
        clearOptions();
        if ($designOption.val() === 'js puns') {
            jsPuns();
        } else if ($designOption.val() === 'heart js') {
            loveJS();
        }
    });

    activities();
});
// End of Document Ready



const clearOptions = () => {
    $colorOption.children().each(function(index, item) {
        item.remove();
    })
    const $option = `<option>Please select a T-shirt theme</option>`;
    $colorOption.append($option);
};

/*$designOption.change(function() {
    if ($designOption.val() === 'js puns') {
        jsPuns();
    } else if ($designOption.val() === 'heart js') {
        loveJS();
    }
});*/
/*const chooseDesign = () => {
    if ($designOption.val() === 'js puns') {
        jsPuns();
    } else if ($designOption.val() === 'heart js') {
        loveJS();
    }
};*/

const addOptions = array => {
    //$colorOption.children().eq(0).remove();
    $.each(array, function(index, value){
        let $element = `<option>${value}</option>`;
        $colorOption.append($element);
    })
};

const loveJS = () => {
    addOptions(loveJsClr);
};

const jsPuns = () => {
    addOptions(jsPunsClr);
};

// If the user selects a workshop, don't allow selection of a workshop at the same day and time
// disable the checkbox and visually indicate the workshop in the competing time slot isnt available
// When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
// As a user selects activities, a running cost total should display below the list of checkboxes.


const activities = () => {

    $('.activities').change('input', function(event) {
        //console.log(`${this.text()}`);
        //console.log(event.target.name);
        //console.log(event.target.parent);

        if (event.target.name === 'express' && event.target.checked) {
            //console.log(event.target.checked);
            $("input[name='js-frameworks']").prop('disabled', true);
        } else if (event.target.name === 'express' && !event.target.checked) {
            $("input[name='js-frameworks']").prop('disabled', false);
        } else if (event.target.name === 'js-frameworks' && event.target.checked) {
            $("input[name='express']").prop('disabled', true);
        } else if (event.target.name === 'js-frameworks' && !event.target.checked) {
            $("input[name='express']").prop('disabled', false);
        } else if (event.target.name === 'js-libs' && event.target.checked) {
            $("input[name='node']").prop('disabled', true);
        } else if (event.target.name === 'js-libs' && !event.target.checked) {
            $("input[name='node']").prop('disabled', false);
        } else if (event.target.name === 'node' && event.target.checked) {
            $("input[name='js-libs']").prop('disabled', true);
        } else if (event.target.name === 'node' && !event.target.checked) {
            $("input[name='js-libs']").prop('disabled', false);
        }

        // work on adding up and showing cost here

    });

}








