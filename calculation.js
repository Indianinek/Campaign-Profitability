
function count(){
	 var cpc=document.getElementById("CPC").value;
	 var cr=document.getElementById("CR").value; // converion not conversion rate
	 var convRate;

	 var ammountClick=document.getElementById("ammountClick").value;
	 var ammountCR = document.getElementById("ammountCR").value;
	 var numerator = ammountCR;
	 var impressions = document.getElementById("currentImpressions").value;
	 var proportion = ammountCR / impressions;

	 var ctr= (ammountClick / impressions)*100;
	 convRate = (ammountCR / ammountClick)*100;

	 $('.cr_result').html("CR =<b> "+convRate.toFixed(2)+"%</b>");

	 var actualCost = (ammountClick * cpc);
		var actualRevenue = cr * ammountCR;
			var actualIncrease = actualRevenue - (actualCost*1.2);
			var actualPercent = (actualIncrease / (actualCost*1.2)) * 100;

		var profit = (actualCost*-1)*1.20 + actualRevenue;

	 $('.ctr_result').html("CTR =<b> "+ctr.toFixed(3)+"</b>");
	 var cpm= actualCost / (impressions/1000); //Total cost of campaign / (Total number of impressions / 1000)
	 $('.cpm_result').html("<b>Campaign raport:</b><br>CPM = <b>"+cpm.toFixed(3)+"$</b>");


			var color;
			if(actualPercent>0){
				color = "#109611";
			}else{
				color = "red";
			}

	 	 $('.actualCost').html("Actual cost of campaign: <b>"+(actualCost*1.2).toFixed(2)+"$ (VAT "+(actualCost*0.2).toFixed(2)+"$)");
		 $('.revenue').html("Revenue : <b>"+actualRevenue.toFixed(2)+"$");
		 $('.profit').html("ROI : <b><font color='"+color+"'>"+profit.toFixed(2)+"$ "+"("+actualPercent.toFixed(2)+"%)</font></b>");


	 if(cr>=cpm){
		 $('.cr_to_cpm_result').html("One conversion <b><font color='#109611'>is profitable</font></b> under 1000 impressions = <b>Conversion "+cr+"$ > CPM "+cpm.toFixed(3)+"$</b>");
	 }
	 else{
		 $('.cr_to_cpm_result').html("<b>One conversion <font color='red'>is not profitable</font> under 1000 impressions =  Conversion "+cr+"$ > CPM "+cpm.toFixed(3)+"$</b>");
		 $('.cr_to_cpm_result').css('color','red');
	 }

	 $('.proportion').html("<b>Mathematical Statistics</b><br>Proportion of Confidence Interval is "+proportion+"");



		$('.proportion').html("<b>Mathematical Statistics</b><br>Proportion of Confidence Interval is "+proportion+"");

		var  confidenceIntervalPlus;
		var confidenceIntervalMinus;
		var squareRootProportion;

		var calcProp; // p ( 1 - p) / 2
 		calcProp =(proportion * (1 - proportion))/impressions;
		squareRootProportion = Math.sqrt(calcProp);
		confidenceIntervalPlus = proportion + (2.6 * squareRootProportion);
		confidenceIntervalMinus = (proportion - (2.6 * squareRootProportion));

		if(confidenceIntervalMinus<0){
			confidenceIntervalMinus = (proportion - (2.6 * squareRootProportion))*-1;
		}

		var confIntPlusPercent = confidenceIntervalPlus *100;
		var confIntMinusPercent = confidenceIntervalMinus *100;


		$('.confIntPlus').html("Maximum confidence interval is "+confidenceIntervalPlus.toFixed(5)+" <b>("+confIntPlusPercent.toFixed(2)+"%)</b>");
		$('.confIntMinus').html("Minimum confidence interval is "+confidenceIntervalMinus.toFixed(6)+" <b>("+confIntMinusPercent.toFixed(2)+"%)</b>");

		var statisticalConvPlus;
		var statisticalConvMinus;

		var conversionsStatMinus = impressions * confidenceIntervalMinus; //wyswietlenia razy dolna granica przedzialu ufnosci
		var conversionsStatPlus = impressions * confidenceIntervalPlus;


		statisticalConvMinus = (impressions * confidenceIntervalMinus) * cr;// wyswietlenia razy dolna granica przedzialu ufnosi razy konwersja
		statisticalConvPlus = (impressions * confidenceIntervalPlus) * cr;


		var roiMinus = (statisticalConvMinus - cpm * (impressions/1000))*1.20;
			var minCost = ((cpm *(impressions / 1000))*1.20);
			var	minIncrease = (cr * Math.round(conversionsStatMinus)) - minCost;
			var roiMinPercentage = (minIncrease / minCost) * 100;
		var roiPlus = (statisticalConvPlus - cpm * (impressions/1000)*1.20);
			var plusCost = ((cpm *(impressions / 1000))*1.20);
			var	plusIncrease = (cr * Math.round(conversionsStatPlus)) - plusCost;
			var roiPlusPercentage = (plusIncrease / plusCost) * 100;


		$('.statisticalRoiResultMinus').html("According to statistical significance<br>There would be <b>at worst "+conversionsStatMinus.toFixed()+" conversions</b> <br> ROI would be <b>"+roiMinus.toFixed(2)+"$ ("+roiMinPercentage.toFixed()+"%)</b>");
		if(roiMinus > 0){
		$('.statisticalRoiResultMinus').css('color','#109611');
		}
		else{
			$('.statisticalRoiResultMinus').css('color','red');
		}

		$('.statisticalRoiResultPlus').html("According to statistical significance<br>There would be <b>at best "+conversionsStatPlus.toFixed()+" conversions</b>  <br>ROI would be <b>"+roiPlus.toFixed(2)+"$ ("+roiPlusPercentage.toFixed()+"%)</b>");
		if(roiPlus >= 0){
		$('.statisticalRoiResultPlus').css('color','#109611');
		}
		else{
		$('.statisticalRoiResultPlus').css('color','red');
		}
		var chartCost=[actualCost/4,actualCost/3,actualCost/2];
		var chartProfit=[profit/5,profit/8,profit/2]; // ROI
		var chartRev=[actualRevenue/5,actualRevenue/8,actualRevenue/2];

	new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: [0,chartCost[0].toFixed(),chartCost[1].toFixed(),chartCost[2].toFixed(),actualCost*1.2],
    datasets: [{
        data: [0,chartCost[0],chartCost[1],chartCost[2],actualCost*1.2],
        label: "Actual Cost",
        borderColor: "#ff0000",
        fill: false
      }, {
        data: [0,chartProfit[0],chartProfit[1],chartProfit[2],profit],
        label: "Actual ROI",
      	borderColor: "#06bf00",
        fill: false
      }, {
        data: [0,chartRev[0],chartRev[1],chartRev[2],actualRevenue],
        label: "Revenue",
        borderColor: "#4eb2e8",
        fill: true
      },
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Cost Chart'
    }
  }
});
var chartRoiMin=[roiMinus/5,roiMinus/8,roiMinus/2]; // ROI
var chartRoiPlus=[roiPlus/5,roiPlus/8,roiPlus/2];

new Chart(document.getElementById("line-chartStat"), {
type: 'line',
data: {
	labels: [0,chartRoiPlus[0].toFixed(),chartRoiPlus[1].toFixed(),chartRoiPlus[2].toFixed(),roiPlus.toFixed(2)],
	datasets: [{
			data: [0,chartRoiMin[0],chartRoiMin[1],chartRoiMin[2],roiMinus.toFixed(2)],
			label: "Worst Possible ROI",
			borderColor: "#ff0000",
			fill: false
		}, {
			data: [0,chartRoiPlus[0],chartRoiPlus[1],chartRoiPlus[2],roiPlus.toFixed(2)],
			label: "Best Possible ROI",
			borderColor: "#06bf00",
			fill: false
		},
	]
},
options: {
	title: {
		display: true,
		text: 'Statistical significance cost chart'
	}
}
});

}
