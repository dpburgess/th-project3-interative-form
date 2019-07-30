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
});

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