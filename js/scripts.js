var year = [];
var free = [];
var reduced = [];
var full = [];
var total = [];
var total_served = [];


var highest_free = 0;
var highest_free_reduced = 0;
var highest_free_full = 0;
var the_rest = 0;

var lowest_free = 100;
var lowest_free_reduced = 0;
var lowest_free_full = 0;
var the_rest_2 = 0;


$(document).ready(function() {

	loadData();

	

    $('#data-table').DataTable( {
        "ajax": 'frl.txt'
    } );
} );

function loadData(){
	$.ajax({
		type: "GET",
		url: "../frl-test.json",
		dataType: "json",
		success: parseData
	})
}

function parseData(data){
	
	for(var i=0, len=data.length; i<len; ++i){
		year.push(data[i]["Fiscal Year"]);
		free.push(data[i]["Free"]);
		reduced.push(data[i]["Reduced"]);
		total.push(data[i]["Total"]);
		total_served.push(data[i]["Total Lunches Served"]);

		if(data[i]["Free"]>highest_free) {
			highest_free = data[i]["Free"];
			highest_free_reduced = data[i]["Reduced"];
			highest_free_full = data[i]["Full Price"];
			highest_free_total = data[i]["Total"];
		}

		if(data[i]["Free"]<lowest_free) {
			lowest_free = data[i]["Free"];
			lowest_free_reduced = data[i]["Reduced"];
			lowest_free_full = data[i]["Full Price"];
			lowest_free_total = data[i]["Total"];
		}

	}

	highest_free = highest_free/highest_free_total;
	highest_free_reduced = highest_free_reduced/highest_free_total;
	highest_free_full = highest_free_full/highest_free_total;

	lowest_free = lowest_free/lowest_free_total;
	lowest_free_reduced = lowest_free_reduced/lowest_free_total;
	lowest_free_full = lowest_free_full/lowest_free_total;


	buildChart()

}


function buildChart(){


	var chart0 = c3.generate({
	    bindto: '#numbers-over-time1',
	    

	    data: {
			json: {
				'Total Participants (millions)': total
			},
	        columns: [
	            ['Participants', total]
	        ],
	        types: {
	            data1: 'line'
	            // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
	        },
	        groups: [['Participants']],
	        colors: {
	            'Total Participants (millions)': '#BF0000',
	        }
	        
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: year,
	            tick: {
			      fit: true,
			      rotate: -60,
			      culling: true
			    },
			    height: 60

	        }
	    }
	    
	});

	var chart1 = c3.generate({
	    bindto: '#numbers-over-time2',
	    

	    data: {
			json: {
				'Total Lunches Served (millions)': total_served
			},
	        columns: [
	            ['Total Lunches Served (millions)', total_served]
	        ],
	        types: {
	            data1: 'line'
	            // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
	        },
	        groups: [['Total Lunches Served (millions)']],
	        colors:{
	        	'Total Lunches Served (millions)': '#BF0000'
	        }
	        
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: year,
	            tick: {
			      fit: true,
			      rotate: -60,
			      culling: true
			    },
			    height: 60

	        }
	    }
	    
	});

	var highestChart = c3.generate({
    	bindto: '#highest-free-chart',
    	data: {
	        columns: [
	            ['Free', highest_free],
	            ['Reduced Price', highest_free_reduced],
	            ['Full Price', highest_free_full]
	        ],
	        colors: {
	            'Free': '#B3B398',
	            'Reduced Price': '#D9D9C3',
	            'Full Price': '#B8CCB8'
	       	},
	        type : 'pie',
	        onclick: function (d, i) { console.log("onclick", d, i); },
	        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
	        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
		}
	});


	var lowestChart = c3.generate({
    	bindto: '#lowest-free-chart',
    	data: {
	        columns: [
	            ['Free', lowest_free],
	            ['Reduced Price', lowest_free_reduced],
	            ['Full Price', lowest_free_full],
	        ],
	        colors: {
	            'Free': '#B3B398',
	            'Reduced Price': '#D9D9C3',
	            'Full Price': '#B8CCB8'
       		},
	        type : 'pie',
	        onclick: function (d, i) { console.log("onclick", d, i); },
	        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
	        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
		}
	});


	var freeVsReducedChart = c3.generate({
		bindto: '#free-vs-reduced-chart',
		data: {
			json: {
				'Free': free,
				'Reduced Price': reduced
			},
	        columns: [
	            ['Free', free],
	            ['Reduced Price', reduced]
	        ],
	        types: {
	            'Free': 'area-spline',
	            'Reduced Price': 'area-spline'
	            // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
	        },
	        groups: [['Free', 'Reduced Price']],
	        colors: {
	            'Free': '#BF0000',
	            'Reduced Price': '#53A6A6',
       		},
       		color: function (color, d) {
            // d will be 'id' when called for legends
            return d.id && d.id === 'data3' ? d3.rgb(color).darker(d.value / 150) : color;
        	}
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: year,
	            tick: {
			      fit: true,
			      rotate: -60,
			      culling: true
			    },
			    height: 60

	        }
	    }
	});


}