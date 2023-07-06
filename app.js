const display = document.querySelector(".calculator-input")
const keys = document.querySelector(".calculator-keys")

let displayValue = "0"
let firstValue = null
let operator = null
// `waitingForSecondValue` değişkeni, `false` değeriyle tanımlanarak ikinci bir değerin beklenmediğini belirtir.
let waitingForSecondValue = false

updateDisplay()

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener("click", function (e) {
    const element = e.target;

    // `matches()` metodu, bir dizenin belirli bir desenle tam olarak eşleşip eşleşmediğini kontrol eder.
    // `return;` ifadesi, bir fonksiyonun çalışmasını sonlandırır ve fonksiyondan çıkış yapar.
    // Buradaki ifade, eğer bir öğe ("element") "button" ile eşleşmiyorsa, fonksiyonun devamını engeller ve çıkış yapar.
    // Yani, "element" bir düğme ("button") değilse, fonksiyon burada sonlanır ve bir şey döndürmez.
    if (!element.matches("button")) return;

    // `contains()` metodu, bir DOM öğesinin sınıfları arasında belirli bir sınıfın olup olmadığını kontrol eder.
    // Bu ifade, `element` adlı bir DOM öğesinin sınıfları arasında "operator" sınıfının bulunup bulunmadığını kontrol eder.
    if (element.classList.contains("operator")) {
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if (element.classList.contains("decimal")) {
        inputDecimal()
        updateDisplay();
        return;
    }

    if (element.classList.contains("clear")) {
        clear();
        updateDisplay();
        return;
    }

    // Bu ifade, `inputNumber` adlı bir fonksiyonu `element.value` değeriyle çağırarak, `num` parametresini `element` öğesinden alır.
    inputNumber(element.value)

    updateDisplay();
});

function handleOperator(nextOperator) {

    // `parseFloat()` fonksiyonu JavaScript'te bir dizeyi ondalık bir sayıya dönüştürmek için kullanılır.
    // Bu kod, `displayValue` olarak adlandırılan bir dizeyi parçalayarak ondalık bir sayıya dönüştürüp, elde edilen değeri `value` değişkenine atar.
    const value = parseFloat(displayValue)

    if (operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }

    if (firstValue == null) {
        firstValue = value
    }

    // `else if (operator)` ifadesi, `operator` değişkeninin dolu olduğu durumda çalışır.
    else if (operator) {
        const result = calculate(firstValue, value, operator)

        // `toFixed()` fonksiyonu, bir sayıyı belirtilen ondalık basamak sayısına yuvarlayarak, bu değeri bir dize olarak döndürür.
        // Yukarıdaki kod, `result` değerini belirtilen ondalık basamak sayısına göre yuvarlar, ondalık sayıya dönüştürür ve `displayValue` değişkenine atar.
        displayValue = `${parseFloat(result.toFixed(7))}`
        firstValue = result
    }

    // Bu kod, `waitingForSecondValue` değişkeninin değerini `true` olarak günceller, böylece ikinci bir değerin beklenildiğini belirtir.
    waitingForSecondValue = true;

    operator = nextOperator;
}

function calculate(first, second, operator) {
    if (operator == "+"){

        // Bu kod, `first` ve `second` değişkenlerini toplar ve elde edilen sonucu döndürür.
        return first + second
    }else if (operator == "-"){ 
        return first - second
    }else if (operator == "*"){
        return first * second
    }else if (operator == "/"){
        return first / second
    }
    return second
}

function inputNumber(num) {

    // True olarak atamıştık
    if (waitingForSecondValue) {

        displayValue = num;

        waitingForSecondValue = false;

    } else {

        // Bu ifade, `displayValue` değişkeninin değerini kontrol eder. Eğer değer "0" ise, `num` değeri atanır, aksi halde `num` değeri `displayValue`'ye eklenir.
        displayValue = displayValue === "0" ? num : displayValue + num;
    }
}


function inputDecimal() {

    // `includes()` metodu, bir dizenin içerisinde belirli bir alt dizenin var olup olmadığını kontrol eder.
    // Bu ifade, `displayValue` değişkeninin içinde nokta karakterinin olup olmadığını kontrol eder. Eğer nokta yoksa (! kullandık), kod çalışır.
    if (!displayValue.includes(".")) {

        displayValue += "."
    }
}

function clear() {
    displayValue = "0";
}

