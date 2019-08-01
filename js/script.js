const $designOption = $('#design');
const $colorOption = $('#color');
const jsPunsClr = ['Cornflower Blue', 'Dark Slate Grey', 'Gold'];
const loveJsClr = ['Tomato', 'Steel Blue', 'Dim Grey'];
const $payment = $('#payment');
let totalCost = 0;
const mainConfPrice = 200;
const workshopPrice = 100;

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
    price();
    payment();
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
        console.log(event.target.parentElement.innerText);

        if (event.target.name === 'express' && event.target.checked) {
            $("input[name='js-frameworks']").prop('disabled', true);
            $("input[name='js-frameworks']").parent().css("text-decoration", "line-through");
        } else if (event.target.name === 'express' && !event.target.checked) {
            $("input[name='js-frameworks']").prop('disabled', false);
            $("input[name='js-frameworks']").parent().css("text-decoration", "none");
        } else if (event.target.name === 'js-frameworks' && event.target.checked) {
            $("input[name='express']").prop('disabled', true);
            $("input[name='express']").parent().css("text-decoration", "line-through");
        } else if (event.target.name === 'js-frameworks' && !event.target.checked) {
            $("input[name='express']").prop('disabled', false);
            $("input[name='express']").parent().css("text-decoration", "none");
        } else if (event.target.name === 'js-libs' && event.target.checked) {
            $("input[name='node']").prop('disabled', true);
            $("input[name='node']").parent().css("text-decoration", "line-through");
        } else if (event.target.name === 'js-libs' && !event.target.checked) {
            $("input[name='node']").prop('disabled', false);
            $("input[name='node']").parent().css("text-decoration", "none");
        } else if (event.target.name === 'node' && event.target.checked) {
            $("input[name='js-libs']").prop('disabled', true);
            $("input[name='js-libs']").parent().css("text-decoration", "line-through");
        } else if (event.target.name === 'node' && !event.target.checked) {
            $("input[name='js-libs']").prop('disabled', false);
            $("input[name='js-libs']").parent().css("text-decoration", "none");
        }

        updatePrice();
    });

}

const price = () => {
    const $price = `<label class="pricelabel">Final Price: $<span id="price">${totalCost}</span></label>`;
    $('.activities').append($price);
};


const updatePrice = () => {
    // if the input name === 'all' then the price changes by 200 and any other name the price changes by 100
    if (event.target.name === 'all' && event.target.checked) {
        totalCost += mainConfPrice;
    } else if (event.target.name === 'all' && !event.target.checked) {
        totalCost -= mainConfPrice;
    } else if (event.target.name !== 'all' && event.target.checked) {
        totalCost += workshopPrice;
    } else if (event.target.name !== 'all' && !event.target.checked) {
        totalCost -= workshopPrice;
    }

    $('#price').text(totalCost);
};

// The "Credit Card" payment option should be selected by default. Display the #credit-card div, 
// and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.

// .select();

const payment = () => {
    //$payment.children().eq(0).prop('disabled', true);
    //$payment.val('Select Payment Method').prop('disabled', true);
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
            $bitcoinSection.hide(); // hide the bitcoin text
            $paypalSection.hide();
        } else if ($(this).val() === 'paypal') {
            $ccSection.hide();
            $bitcoinSection.hide(); // hide the bitcoin text
            $paypalSection.show();
        } else if ($(this).val() === 'bitcoin') {
            $ccSection.hide();
            $bitcoinSection.show(); // hide the bitcoin text
            $paypalSection.hide();
        }
    });
};







