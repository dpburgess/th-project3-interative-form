const $designOption = $('#design');
const $colorOption = $('#color');

$( document ).ready(function() {
    $('#name').focus()
    $('#other-title').hide();

    clearOptions();
});

// Done // remove color options in the Color drop down from the outset and the drop down says "Please select a T-shirt theme"
// when design "Theme - JS Puns" is selected then show colors "Cornflower Blue," "Dark Slate Grey," and "Gold."
//  when design "Theme - I ♥ JS" is selected then show colors "Tomato," "Steel Blue," and "Dim Grey."
// when a new theme is selected the color field and drop down menu update
// if the use clears the design list, then clear the color list


const clearOptions = () => {
    if ($designOption.val() === 'Select Theme') {
        $colorOption.children().each(function(index, item) {
            item.remove();
        })
    const $option = `<option>Please select a T-shirt theme</option>`;
    $colorOption.append($option);
    }
};

const chooseDesign = () => {

};