const $designOption = $('#design');
const $colorOption = $('#color');
const $name = $('#name');
const jsPunsClr = ['Cornflower Blue', 'Dark Slate Grey', 'Gold'];
const loveJsClr = ['Tomato', 'Steel Blue', 'Dim Grey'];
let totalCost = 0;

$(document).ready(function() {
    $name.focus();
    $('#other-title').hide();

    $designOption.change(function() {
        // add a function here that clears the previous options
        clearOptions();
        if ($designOption.val() === 'js puns') {
            jsPuns();
        } else if ($designOption.val() === 'heart js') {
            loveJS();
        }
    });

    const showJobRole = () => {
        const $titleSelect = $('#title');
        $titleSelect.change(function() {
            if ($('#title option:selected').text() === 'Other') {    
                $('#other-title').show();
            } else {
                $('#other-title').hide();
            }
        });
    }

    showJobRole();

    const clearOptions = () => {
        $colorOption.children().each(function(index, item) {
            item.remove();
        })
        const $option = `<option>Please select a T-shirt theme</option>`;
        $colorOption.append($option);
    };

    clearOptions();

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

    const activities = () => {
        /*const $checkboxes = ('input:checkbox');
        //console.log(event.target.parent);
        $checkboxes.each(function(this) {
            $this.on('click', function() {

            });
        });*/

        //$('.activities').on('click', 'input', function() {
            //$(this).something;
        //});

        //$('.activities').change('input', function() {
            //$(this).
        //});

        $('.activities').change('input', function(event) {
            //console.log(`${this.text()}`);
            console.log(event);
            //console.log(event.target.parentElement.innerText);
            console.log(event.target.attributes["data-cost"].value);
            const checkbox = event.target;

            // look at doing event.target on lines 103-104 instead of typing out the attribute two times
            if (checkbox.name === 'express' && checkbox.checked) {
                $("input[name='js-frameworks']").prop('disabled', true);
                $("input[name='js-frameworks']").parent().css("text-decoration", "line-through");
            } else if (checkbox.name === 'express' && !checkbox.checked) {
                $("input[name='js-frameworks']").prop('disabled', false);
                $("input[name='js-frameworks']").parent().css("text-decoration", "none");
            } else if (checkbox.name === 'js-frameworks' && checkbox.checked) {
                $("input[name='express']").prop('disabled', true);
                $("input[name='express']").parent().css("text-decoration", "line-through");
            } else if (checkbox.name === 'js-frameworks' && !checkbox.checked) {
                $("input[name='express']").prop('disabled', false);
                $("input[name='express']").parent().css("text-decoration", "none");
            } else if (checkbox.name === 'js-libs' && checkbox.checked) {
                $("input[name='node']").prop('disabled', true);
                $("input[name='node']").parent().css("text-decoration", "line-through");
            } else if (checkbox.name === 'js-libs' && !checkbox.checked) {
                $("input[name='node']").prop('disabled', false);
                $("input[name='node']").parent().css("text-decoration", "none");
            } else if (checkbox.name === 'node' && checkbox.checked) {
                $("input[name='js-libs']").prop('disabled', true);
                $("input[name='js-libs']").parent().css("text-decoration", "line-through");
            } else if (checkbox.name === 'node' && !checkbox.checked) {
                $("input[name='js-libs']").prop('disabled', false);
                $("input[name='js-libs']").parent().css("text-decoration", "none");
            }

            updatePrice(event);
        });

        /*
        $('.activities').change('input', function() {
            $(this).
        });
        */

    }

    activities();

    const price = () => {
        const $price = `<label class="pricelabel">Final Price: $<span id="price">${totalCost}</span></label>`;
        $('.activities').append($price);
    };

    price();

    const updatePrice = (event) => {
        // if the input name === 'all' then the price changes by 200 and any other name the price changes by 100

        let cost = parseInt(event.target.attributes["data-cost"].value.substring(1));  // need to remove the dollar symbol from the string and turn it into an int
        // could change this to try and use the data-cost atrribute on the event to update the price instead of having it saved as a variable at the top

        if (event.target.checked) {
            totalCost += cost;
        } else {
            totalCost -= cost;
        }
    /*
        if (event.target.name === 'all' && event.target.checked) {
            totalCost += cost;
        } else if (event.target.name === 'all' && !event.target.checked) {
            totalCost -= cost;
        } else if (event.target.name !== 'all' && event.target.checked) {
            totalCost += cost;
        } else if (event.target.name !== 'all' && !event.target.checked) {
            totalCost -= cost;
        }
    */
        $('#price').text(totalCost);
    };

    // The "Credit Card" payment option should be selected by default. Display the #credit-card div, 
    // and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.

    // .select();

    const payment = () => {
        //$payment.children().eq(0).prop('disabled', true);
        //$payment.val('Select Payment Method').prop('disabled', true);
        const $payment = $('#payment');
        const $paymentSection = $('.activities').next();
        const $ccSection = $('#credit-card');
        const $bitcoinSection = $paymentSection.children().eq(-1);
        const $paypalSection = $paymentSection.children().eq(-2);
        $('#payment option[value="select_method"]').prop('disabled', true);
        $('#payment option[value="credit card"]').prop('selected', true); // set defualt credit card selection
        $bitcoinSection.hide(); // hide the bitcoin text
        $paypalSection.hide(); // hide the paypal text
        
        $payment.change(function() {
            if ($(this).val() === 'credit card') {
                $ccSection.show();
                $bitcoinSection.hide();
                $paypalSection.hide();
            } else if ($(this).val() === 'paypal') {
                $ccSection.hide();
                $bitcoinSection.hide();
                $paypalSection.show();
            } else if ($(this).val() === 'bitcoin') {
                $ccSection.hide();
                $bitcoinSection.show();
                $paypalSection.hide();
            }
        });
    };

    payment();

    // create some kind of function that loops through the checkbox/input elements and determines if it's true that 
    // any of those elements are checked, or false.
    // Then you'll need to make sure that the event that leads to your form being submitted calls 
    // for all of those validations to be run. And if they don't measure up, you'll need to prevent the form from submitting.

    // the parent function that runs all the smaller validations
    const formValidation = (event) => {
        
        //validateName();
        //validateEmail();
        //validateCheckBoxes();


        if ($('#payment').val() === 'credit card') {
            //validateCreditCard();
            validateCvv();
            //validateZipCode();

            /*if (validateCreditCard() && validateCvv() && validateZipCode()) {
                return true;
            } else {
                return false
            }*/
        }

        //validateCheckBoxes();
        //validateName();
        //validateEmail();
    };

    $('form').submit(function(e) {
        if (formValidation()) {
            return true;
        } else {
            e.preventDefault();
        }
    });

    const validateCreditCard = () => {
        const ccRegex = /^\d{13,16}$/
        const ccNum = $('#cc-num').val();
        const $ccNumLabel = $('label[for=cc-num]');
        //const $span = `<span class="error" data-validation="cc">Valid credit card number required</span>`;
        
        if (ccRegex.test(ccNum)) {
            $ccNumLabel.removeClass('error');
            return true;
        } else {
            $ccNumLabel.addClass('error');
            return false;
        }
    };

    const validateZipCode = () => {
        const zipCodeRegex = /^\d{5}$/
        const zipCode = $('#zip').val();
        const $zipCodeLabel = $('label[for=zip]');
        //const $span = `<span class="error" data-validation="zip">Valid zip code required</span>`;

        if (zipCodeRegex(zipCode)) {
            $zipCodeLabel.removeClass('error');
            return true;
        } else {
            $zipCodeLabel.addClass('error');
            return false;
        }
    };

    const validateCvv = () => {
        const cvvRegex = /^\d{3}$/
        const cvvCode = $('#cvv').val();
        const $cvvLabel = $('label[for=cvv]');
        //const $span = `<span class="error" data-validation="cvv">Valid cvv code required</span>`;
        console.log(cvvRegex(cvvCode));
        if (cvvRegex(cvvCode)) {
            $cvvLabel.removeClass('error');
            return true;
        } else {
            $cvvLabel.addClass('error');
            return false;
        }
    }

    const validateCheckBoxes = () => {
        const $checkboxLabel = $('.activities').children().eq(0);
        //const $span = `<span class="error" data-validation="checkbox">At least one activity needs to be selected</span>`;

        let countChecked = 0;
        $('input[type="checkbox"]').each(function(index, element) {
            if ($(element).prop("checked")) {
                countChecked += 1;
                $checkboxLabel.removeClass('error');
                return true;
            };
        });
        console.log(countChecked);
        if (countChecked === 0) {
            $checkboxLabel.addClass('error');
            return false;
        }
    };

    const validateName = () => {
        const $nameLabel = $('label[for=name]');
        //const $span = `<span class="error" data-validation="name">Must enter a name</span>`;

        if ($('#name').val() === '') {
            $nameLabel.addClass('error');
            return false;
        } else {
            $nameLabel.removeClass('error');
            return true;
        }
    };

    const validateEmail = () => {
        const regex = /^\w+@[a-z0-9]+\.\D+$/
        const userEmail = $('#mail').val();
        const $emailLabel = $('label[for=mail]');
        //const $span = `<span class="error" data-validation="email">Valid email required</span>`;

        if (regex.test(userEmail)) {
            $emailLabel.removeClass('error');
            return true;
        } else {
            $emailLabel.addClass('error');
            return false;
        }
    };

});






