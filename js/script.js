const $designOption = $('#design');
const $colorOption = $('#color');
const $name = $('#name');
const jsPunsClr = ['Cornflower Blue', 'Dark Slate Grey', 'Gold'];
const loveJsClr = ['Tomato', 'Steel Blue', 'Dim Grey'];
const $colorLabel = $('label[for="color"]');
let totalCost = 0;

$(document).ready(function () {
    $name.focus();
    $('#other-title').hide();
    $colorLabel.hide();
    $colorOption.hide();

    $designOption.change(function () {
        $colorLabel.show();
        $colorOption.show();
        clearOptions();
        if ($designOption.val() === 'js puns') {
            jsPuns();
        } else if ($designOption.val() === 'heart js') {
            loveJS();
        }
    });

    const showJobRole = () => {
        const $titleSelect = $('#title');
        $titleSelect.change(function () {
            if ($('#title option:selected').text() === 'Other') {
                $('#other-title').show();
            } else {
                $('#other-title').hide();
            }
        });
    }

    showJobRole();

    const clearOptions = () => {
        $colorOption.children().each(function (index, item) {
            item.remove();
        })
    };

    const addFirstOption = () => {
        const $option = `<option>Please select a T-shirt theme</option>`;
        $colorOption.append($option);
    }

    clearOptions();
    addFirstOption();

    const addOptions = array => {
        $.each(array, function (index, value) {
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

    $('.activities').change('input', function (event) {
        const checkbox = event.target;

        $('input[type="checkbox"]').each(function (index, element) {
            if (checkbox.name === 'all') {
                return;
            }
            if (checkbox.checked) {
                if (checkbox !== element && checkbox.attributes['data-day-and-time'].value === $(element).attr('data-day-and-time')) {
                    $(element).prop('disabled', true);
                    $(element).parent().css('text-decoration', 'line-through');
                }
            } else {
                if (checkbox.attributes['data-day-and-time'].value === $(element).attr('data-day-and-time')) {
                    $(element).prop('disabled', false);
                    $(element).parent().css('text-decoration', 'none');
                }
            }
        });

        updatePrice(event);
    });

    const price = () => {
        const $price = `<label class="pricelabel">Final Price: $<span id="price">${totalCost}</span></label>`;
        $('.activities').append($price);
    };

    price();

    const updatePrice = (event) => {
        let cost = parseInt(event.target.attributes["data-cost"].value.substring(1));

        if (event.target.checked) {
            totalCost += cost;
        } else {
            totalCost -= cost;
        }

        $('#price').text(totalCost);
    };


    const payment = () => {
        const $payment = $('#payment');
        const $paymentSection = $('.activities').next();
        const $ccSection = $('#credit-card');
        const $bitcoinSection = $paymentSection.children().eq(-1);
        const $paypalSection = $paymentSection.children().eq(-2);
        $('#payment option[value="select_method"]').prop('disabled', true);
        $('#payment option[value="credit card"]').prop('selected', true); // set defualt credit card selection
        $bitcoinSection.hide(); // hide the bitcoin text
        $paypalSection.hide(); // hide the paypal text

        $payment.change(function () {
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

    // the parent function that runs all the smaller validations
    const formValidation = () => {
        let response = '';
        let ccResponse = '';

        let validNameResponse = validateName();
        let validEmailResponse = validateEmail();
        let validCheckboxResponse = validateCheckBoxes();
        let validCCResponse = validateCreditCard();
        let validCvvResponse = validateCvv();
        let validZipResponse = validateZipCode();

        if (validNameResponse && validEmailResponse && validCheckboxResponse) {
            response = true;
        } else {
            response = false;
        }

        if ($('#payment').val() === 'credit card') {
            if (validCCResponse && validCvvResponse && validZipResponse) {
                ccResponse = true;
            } else {
                ccResponse = false;
            }
        }

        if ($('#payment').val() === 'credit card') {
            if (response && ccResponse) {
                return true;
            } else {
                return false;
            }
        } else {
            if (response) {
                return true;
            } else {
                return false;
            }
        }
    };

    $('form').submit(function (e) {
        if (formValidation(e)) {
        } else {
            e.preventDefault();
        }
    });

    const validateCreditCard = () => {
        const ccRegex = /^\d{13,16}$/
        const ccNum = $('#cc-num').val();
        const $ccNumLabel = $('label[for=cc-num]');

        if (ccNum === '') {
            $ccNumLabel.addClass('lengtherror');
            return false;
        } else {
            $ccNumLabel.removeClass('lengtherror');
        }

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

        if (zipCodeRegex.test(zipCode)) {
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

        if (cvvRegex.test(cvvCode)) {
            $cvvLabel.removeClass('error');
            return true;
        } else {
            $cvvLabel.addClass('error');
            return false;
        }
    }

    const validateCheckBoxes = () => {
        const $checkboxLabel = $('.activities').children().eq(0);

        let countChecked = 0;
        $('input[type="checkbox"]').each(function (index, element) {
            if ($(element).prop("checked")) {
                countChecked += 1;
                $checkboxLabel.removeClass('error');
            };
        });

        if (countChecked > 0) {
            $checkboxLabel.removeClass('error');
            return true;
        } else {
            $checkboxLabel.addClass('error');
            return false;
        }
    };

    const validateName = () => {
        const $nameLabel = $('label[for=name]');

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

        if (regex.test(userEmail)) {
            $emailLabel.removeClass('error');
            return true;
        } else {
            $emailLabel.addClass('error');
            return false;
        }
    };

    $('#mail').keydown(function (e) {
        const userEmail = e.target.value;
        const regex = /^\w+@[a-z0-9]+\.\D+$/
        const $emailLabel = $('label[for=mail]');

        if (regex.test(userEmail)) {
            $emailLabel.removeClass('error');
        } else {
            $emailLabel.addClass('error');
        }
    });
});






