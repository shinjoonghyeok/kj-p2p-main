/**
 * Created by ST383 on 2016-11-20.
 */

var rankTextV = [17549088,833634,16960352,833602,17419040,832562,833313,833074];
var temp_rank = [];
var rank = [];


for(var c = 0; c < rankTextV.length ; c ++) {
    temp_rank.push({index:c+1, value:rankTextV[c]});
}

//temp_rank.sort( function(a,b){return a.value-b.value}); // 오름차순
temp_rank.sort( function(a,b){return b.value-a.value}); // 내림차순

for(var c = 0; c < rankTextV.length ; c ++) {
    rank[c]=temp_rank[c].index;
}



console.log( temp_rank);
console.log( rank);




