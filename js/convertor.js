var stackArr = [];

var top_stack = -1;


function push_stack(ele) {

    stackArr[++top_stack] = ele;

}


function pop_stack() {

    return (stackArr[top_stack--]);

}


function topStack(stackArr) {

    return (stackArr[stackArr.length - 1]);

}

//checking is operator

function isOperator(who) {

    switch (who) {

        case "**":

        case "*":

        case "/":

        case "+":

        case "-":

        case ")":

        case "(":

            return 1;

        default: return 0;

    }

}
function OperatorAh(who) {

    switch (who) {

        case "**":

        case "^":

        case "*":

        case "/":

        case "+":

        case "-":
            return 1;

        default: return 0;

    }

}

//checking precidence of the operator

function prcd(op) {

    switch (op) {

        case "**":

        case "$":

            return 4;

        case "*":

        case "/":

            return 3;

        case "+":

        case "-":

            return 2;

        case "(":

        case ")":

        case "#":

            return 1;

        default: return 0;

    }

}

//convert infix to postfix

function InfixToPostfix(infi) {

    var postfix = new Array();

    stackArr = [];

    push_stack("#");

    var ptr = 0;

    infi = infi.split(" ");

    var ch;

    for (var i = 0; i < infi.length; i++) {

        ch = infi[i];

        if (isOperator(ch) == 0) {

            postfix[ptr++] = ch;

        }

        else {

            if (ch == ")") {

                while (stackArr[top_stack] != "(") {

                    postfix[ptr++] = pop_stack();

                }

                pop_stack();

            }

            else {

                if (ch == "(") {

                    push_stack(ch);

                }

                else {

                    if (prcd(ch) > prcd(stackArr[top_stack])) {

                        push_stack(ch);

                    }

                    else {

                        while ((prcd(ch) <= prcd(stackArr[top_stack]) && top_stack > -1)) {

                            postfix[ptr++] = pop_stack();



                        }

                        push_stack(ch);

                    }

                }

            }

        }

    }

    while (stackArr[top_stack] != "#") {

        postfix[ptr++] = pop_stack();

    }

    return postfix.join(" ");

}



function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
}
function PostfixToPrefix(infi) {
    infi = infi.split(" ");
    var ind = 0;
    var array = [];
    for (var i = 0; i < infi.length; i++) {
        infi[i] = String(infi[i]);
        var k = infi[i];
        if (isOperator(k)) {
            var first = array[ind - 1];
            ind -= 1;
            var second = array[ind - 1];
            ind -= 1;
            array[ind] = infi[i] + " " + second + " " + first;
            ind += 1;
        }
        else {
            array[ind] = infi[i];
            ind += 1;
        }
    }


    ind -= 1;
    var ans = "";
    while (ind >= 0) ans += " " + array[ind--];
    return ans;

}
function PostfixToInfix(postfixStr) {
    var stackarr = [];
    postfixStr = postfixStr.split(" ");
    var len = 0;
    for (var i = 0; i < postfixStr.length; i++) {
        if (!isOperator(postfixStr[i])) {
            stackarr[len++] = postfixStr[i];
        }
        else {
            var temp1 = stackarr[len - 1];
            len--;
            var temp2 = stackarr[len - 1];
            len--;
            var pushVal = "( " + temp2 + " " + postfixStr[i] + " " + temp1 + " )";
            stackarr[len] = pushVal;
            len++;
        }
    }
    return (stackarr[len - 1]);
}

function PrefixToInfix(postfixStr) {
    var stackarr = [];
    postfixStr = postfixStr.split(" ");
    var len = 0;
    console.log(postfixStr);
    for (var i = postfixStr.length - 1; i >= 0; i--) {
        if (!isOperator(postfixStr[i])) {
            stackarr[len++] = postfixStr[i];
        }
        else {
            var temp1 = stackarr[len - 1];
            len--;
            var temp2 = stackarr[len - 1];
            len--;
            var pushVal = "( " + temp1 + " " + postfixStr[i] + " " + temp2 + " )";
            stackarr[len] = pushVal;
            len++;
        }
    }
    return (stackarr[len - 1]);
}
function Replace(str) {
    while (str.includes("**")) {
        str = str.replace('**', "^");
    }
    return str;
}
function run() {

    var a, Postfix, Infix, Prefix;
    var flag = 1;
    a = (document.getElementById("fst").value).trim();
    var b = "";
    if (a == "") return;
    for (var i = 0; i < a.length; i++) {
        if (a[i] == " ") {
            if (b != "" && b[b.length - 1] != " ") b += a[i];
        }
        else if (a[i] == '[' || a[i] == ']' || a[i] == '{' || a[i] == '}') {
            if (a[i] == '[' || a[i] == '{') b += '(';
            else b += ')';
        }
        else {
            if (a[i] == '^') b += '**';
            else
                b += a[i];
        }

        if (isNaN(a[i]) && a[i] != '.' && ((a[i - 1] != ' ' && i - 1 >= 0) || (a[i + 1] != ' ' && i + 1 < a.length))) flag = 0;
    }

    a = b;
    Postfix = a;
    Infix = a;
    Prefix = a;
    var last = a[a.length - 1];
    var first = a[0];
    if (!OperatorAh(first) && !OperatorAh(last)) {
        Postfix = InfixToPostfix(a);
        Prefix = PostfixToPrefix(Postfix);
    }
    else {
        if (!isOperator(first)) {//it is postfix
            Infix = PostfixToInfix(a);
            Prefix = PostfixToPrefix(a);

        }
        else {// it is prefix
            Infix = PrefixToInfix(a);
            Postfix = InfixToPostfix(Infix);

        }
    }
    document.getElementById("infi").textContent = Replace(Infix);
    document.getElementById("prefi").textContent = Replace(Prefix);
    document.getElementById("postfi").textContent = Replace(Postfix);

    try {
        document.getElementById("ans").textContent = eval(Infix);
        var k = Number(eval(Infix));
    }
    catch (err) {

        document.getElementById("ans").textContent = "Invalid Input";
        document.getElementById("infi").textContent = "Invalid Input";
        document.getElementById("prefi").textContent = "Invalid Input";
        document.getElementById("postfi").textContent = "Invalid Input";
    }
    if ((typeof eval(Infix) == "string") || String(eval(Infix)) == "NaN" || flag === 0) {
        document.getElementById("ans").textContent = "Invalid Input";
        document.getElementById("infi").textContent = "Invalid Input";
        document.getElementById("prefi").textContent = "Invalid Input";
        document.getElementById("postfi").textContent = "Invalid Input";
    }


}

