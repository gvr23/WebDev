

function average(arr){
    var sum = 0;
    var avg = 0;
    
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    avg = sum / arr.length;
    
    console.log(Math.round(avg));
}

var scores = [90, 98, 89, 100, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

average(scores);
average(scores2);