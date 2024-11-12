var num3=0;
var num4=0;
var num5=0;
var numRolls=0;
var price=0;

function pull(times)
{
    switch(times)
    {
    case 1:
        pull_once();
        calcPrice();
        displayResult();
        break;
    case 2:
        clear();
        pull_10();
        calcPrice();
        displayResult();
        clear();
        break;
    default:
        clear();
        pull_5star();
        calcPrice();
        displayResult();
        clear();
    }
}

function test()
{
    alert("hi");
}

function pull_once()
{
    rng=Math.random();
    if(rng<=.70)
    {
        num3++;
        numRolls++;
    }
    else if(rng>.70 && rng<0.97)
    {
        num4++;
        numRolls++;
    }
    else
    {
        num5++;
        numRolls++;
    }
}

function pull_10()
{
    num4++;
    numRolls++;
    for(var i=0;i<10;i++)
    {
        pull_once();
    }
}

function pull_5star()
{
    while(num5==0)
    {
        pull_once();
    }
}
function displayResult()
{
    document.getElementById("res3").innerHTML=num3;
    document.getElementById("res4").innerHTML=num4;
    document.getElementById("res5").innerHTML=num5;
    document.getElementById("numPulls").innerHTML=numRolls;
    document.getElementById("priceTotal").innerHTML="You rolled "+numRolls+" times, spending R$"+price+"!";
}
function clear()
{
    num3=0;
    num4=0;
    num5=0;
    numRolls=0;
    price=0;
}
function clearResults()
{
    clear();
    displayResult();
}
function calcPrice()
{
    price=numRolls*16;
}
