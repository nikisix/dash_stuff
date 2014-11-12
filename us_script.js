function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
    return "<h4>"+n+"</h4><table>"+
        "<tr><td>Low</td><td>"+(d.low)+"</td></tr>"+
        "<tr><td>Average</td><td>"+(d.avg)+"</td></tr>"+
        "<tr><td>High</td><td>"+(d.high)+"</td></tr>"+
        "</table>";
}

/*read in oldest, youngest and median by state TODO*/
var old_med_young = {};
old_med_young = d3.csv("old_med_young.csv");

var sampleData ={};	/* Sample random data. */	
["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
"ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
"MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
"CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
"WI", "MO", "AR", "OK", "KS", "LS", "VA"]
    .forEach(function(d){ 
        var low=Math.round(100*Math.random()), 
            mid=Math.round(100*Math.random()), 
            high=Math.round(100*Math.random());
        sampleData[d]={low:d3.min([low,mid,high]), high:d3.max([low,mid,high]), 
                avg:Math.round((low+mid+high)/3), color:d3.interpolate("#ffffcc", "#800026")(low/100)}; 
    });

/* draw states on id #statesvg */	
uStates.draw("#statesvg", sampleData, tooltipHtml);
