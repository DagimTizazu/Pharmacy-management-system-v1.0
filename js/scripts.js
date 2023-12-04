$(function () {

    //Total cost function 
    function totalCostCalculator(x, y, z) {
        var a = parseInt(x);
        var b = parseInt(y);
        var c = parseInt(z);
        var $newTotalCost = (a * b) + c;
        return $newTotalCost;
    }

    //Total sell function & also used for inline items left calculation (multiply function)
    function totalSellAndInlineCalculator(x, y) {
        var a = parseInt(x);
        var b = parseInt(y);
        var $newTotalSell = a * b;
        return $newTotalSell;
    }

    //no of items left in stock function & also used for calculating profit (subtraction function)
    function stockAndProfitCalculator(x, y) {
        var a = parseInt(x);
        var b = parseInt(y);
        var $newStock = a - b;
        return $newStock;
    }


    //Total cost events
    $('.unit-price').each(function (index) {
        $(this).on('input', function () {
                
            var $unitPriceValue = $('.unit-price:eq(' + index + ')').val();
            var $quantityValue = $('.quantity:eq(' + index + ')').val();
            var $transportValue = $('.transport:eq(' + index + ')').val();
            var $updatedTotalCost = totalCostCalculator($unitPriceValue, $quantityValue, $transportValue);
            $('.total-cost:eq(' + index + ')').text($updatedTotalCost);
            
            //for updating inline
            var $stockValue = $('.stock:eq(' + index + ')').text();
            var $updatedInline = totalSellAndInlineCalculator($unitPriceValue, $stockValue);
            $('.inline:eq(' + index + ')').text($updatedInline);

            //for updating profit
            var $totalSellValue = $('.total-sell:eq(' + index + ')').text();
            var $updatedProfit = stockAndProfitCalculator($totalSellValue, $updatedTotalCost);
            $('.profit:eq(' + index + ')').text($updatedProfit);
          
        });
    });
            
    $('.quantity').each(function (index) {
        $(this).on('input', function () {
                
            var $unitPriceValue = $('.unit-price:eq('+ index +')').val();
            var $quantityValue = $('.quantity:eq('+ index +')').val();
            var $transportValue = $('.transport:eq('+ index +')').val();
            var $updatedTotalCost = totalCostCalculator($unitPriceValue, $quantityValue, $transportValue);
            $('.total-cost:eq('+ index +')').text($updatedTotalCost);
            
            //for updating stock
            var $soldQuantityValue = $('.sold-quantity:eq('+ index +')').val();
            var $updatedStock = stockAndProfitCalculator($quantityValue, $soldQuantityValue);
            $('.stock:eq(' + index + ')').text($updatedStock);
            
            //for updating inline
            var $updatedInline = totalSellAndInlineCalculator($unitPriceValue, $updatedStock);
            $('.inline:eq(' + index + ')').text($updatedInline);

            //for updating profit
            var $totalSellValue = $('.total-sell:eq(' + index + ')').text();
            var $updatedProfit = stockAndProfitCalculator($totalSellValue, $updatedTotalCost);
            $('.profit:eq(' + index + ')').text($updatedProfit);

        });
    });

    $('.transport').each(function (index) {
        $(this).on('input', function () {
                
            var $unitPriceValue = $('.unit-price:eq('+ index +')').val();
            var $quantityValue = $('.quantity:eq('+ index +')').val();
            var $transportValue = $('.transport:eq('+ index +')').val();
            var $updatedTotalCost = totalCostCalculator($unitPriceValue, $quantityValue, $transportValue);
            $('.total-cost:eq('+ index +')').text($updatedTotalCost);

            //for updating profit
            var $totalSellValue = $('.total-sell:eq(' + index + ')').text();
            var $updatedProfit = stockAndProfitCalculator($totalSellValue, $updatedTotalCost);
            $('.profit:eq(' + index + ')').text($updatedProfit);
        });
    });

    
    //Total sell events
    $('.selling-price').each(function (index) {
        $(this).on('input', function () {
            var $sellingPriceValue = $('.selling-price:eq('+ index +')').val();
            var $soldQuantityValue = $('.sold-quantity:eq('+ index +')').val();
            var $updatedTotalSell = totalSellAndInlineCalculator($sellingPriceValue, $soldQuantityValue);
            $('.total-sell:eq('+ index +')').text($updatedTotalSell);

            //for updating profit
            var $totalCostValue = $('.total-cost:eq(' + index + ')').text();
            var $updatedProfit = stockAndProfitCalculator($updatedTotalSell, $totalCostValue);
            $('.profit:eq(' + index + ')').text($updatedProfit);
        })
    });

    $('.sold-quantity').each(function (index) {
        $(this).on('input', function () {
            var $sellingPriceValue = $('.selling-price:eq('+ index +')').val();
            var $soldQuantityValue = $('.sold-quantity:eq('+ index +')').val();
            var $updatedTotalSell = totalSellAndInlineCalculator($sellingPriceValue, $soldQuantityValue);
            $('.total-sell:eq(' + index + ')').text($updatedTotalSell);
            
            //for updating stock
            var $quantityValue = $('.quantity:eq(' + index + ')').val();
            var $updatedStock = stockAndProfitCalculator($quantityValue, $soldQuantityValue);
            $('.stock:eq(' + index + ')').text($updatedStock);
            
            //for updating inline
            var $unitPriceValue = $('.unit-price:eq('+ index +')').val();
            var $updatedInline = totalSellAndInlineCalculator($unitPriceValue, $updatedStock);
            $('.inline:eq(' + index + ')').text($updatedInline);

            //for updating profit
            var $totalCostValue = $('.total-cost:eq(' + index + ')').text();
            var $updatedProfit = stockAndProfitCalculator($updatedTotalSell, $totalCostValue);
            $('.profit:eq(' + index + ')').text($updatedProfit);
        })
    });

    //Summation events
    //for calculating total sum of all total-cost
    $('.unit-price, .quantity, .transport').on('input', function () {
        var $totalCostSum = 0;
        $('.total-cost').each(function () {
            var $totalCostValue = parseInt($(this).text());
            if (!isNaN($totalCostValue)) {
                $totalCostSum += $totalCostValue;
            }
        });
        $('.total-cost-sum').text($totalCostSum);
    });

    //for calculating total sum of all sell 
    $('.selling-price, .sold-quantity').on('input', function () {
        var $totalSellSum = 0;
        $('.total-sell').each(function () {
            var $totalSellValue = parseInt($(this).text());
            if (!isNaN($totalSellValue)) {
                $totalSellSum += $totalSellValue;
            }
        });
        $('.total-sell-sum').text($totalSellSum);
    });

    //for calculating total sum of all profit
    $('.unit-price, .quantity, .transport, .selling-price, .sold-quantity').on('input', function () {
        var $totalProfitSum = 0;
        $('.profit').each(function () {
            var $totalProfitValue = parseInt($(this).text());
            if (!isNaN($totalProfitValue)) {
                $totalProfitSum += $totalProfitValue;
            }
        });
        $('.profit-sum').text($totalProfitSum);
    });

    //Reset to zero button
    $('.reset-to-zero').on('click', function () {
        $('.unit-price, .quantity, .transport, .selling-price, .sold-quantity').val(0);
        $('.total-cost, .total-sell, .stock, .inline, .profit').text(0);
        $('.total-cost-sum, .total-sell-sum, .profit-sum').text(0);
    });

    //current date
    var today = new Date();

    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var day = dayNames[today.getDay()];

    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = monthNames[today.getMonth()];

    var date = today.getDate();
    var year = today.getFullYear();

    var formattedDate = day + ' ' + month + ' ' + date + ' ' + year;

    //Table to excel
    $('.download').on('click', function () {

         $('.unit-price, .quantity, .transport, .selling-price, .sold-quantity').each(function () {
            var $thisValue = $(this).val();
            var $parentElement = $(this).parent();
             $parentElement.text($thisValue);
        });

        $('.table').table2excel({
            filename: "Costs of " + formattedDate,
            fileext: ".xls",
            preserveColors:true
        });

        $('.download, .reset-to-zero').css({ 'display': 'none' });
        $('.export-notification').css({ 'display': 'block' });
    });
    
});