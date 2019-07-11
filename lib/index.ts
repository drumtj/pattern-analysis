import DATA from "./data.json";


export const data = eval(`d=>d.reduce((r,a)=>r.concat(a.map(o=>o.value)), []);`)(DATA);

export function getData(day?){
  if(day === undefined){
    return data;//eval(`d=>d.reduce((r,a)=>r.concat(a.map(o=>o.value)), []);`)(DATA)
  }else{
    return eval(`d=>d.slice(d.length-day, d.length).reduce((r,a)=>r.concat(a.map(o=>o.value)), []);`)(DATA)
  }
}

export function checkPattern(c, gameCount){
	var pts;
	if(typeof c === "number"){
		pts = pattern(c);
  }else if(typeof c === "string"){
		pts = [c];
		c = c.length;
  }else if(Array.isArray(c)){
		pts = c;
  }

  var data;
  if(Array.isArray(gameCount)){
    data = gameCount.join('');
  }else{
    data = Array(gameCount).fill(0).map(v=>getRandNum()[0]%2==1?1:0).join('');
  }

	//var data = Array(gameCount).fill(0).map(v=>getRandNum()[0]%2==1?1:0);
	//data = (d||Array(gameCount).fill(0).map(v=>getRandNum()[0]%2==1?1:0)).join('');
	console.error("pattern", pts);
	//console.error("test data", data);
	var i, j, k, chk, l=data.length;
	return pts.map(pt=>{
		var count=0;
		k = pt.length;
		for(i=0; i<l-k; i++){
			chk = true;
			for(j=0; j<k; j++){
				chk = data[i+j] == pt[j];
				if(!chk) break;
            }
			if(chk) count++;
    	}
		return [pt, count];
    }).sort((a,b)=>b[1]-a[1]);
}

export function pattern(c){
    //var c = 4;//자릿수
    var n = Math.pow(2, c);
    var s = '0'.repeat(c);
	var r = [];
    for(var i=0; i<n; i++){
	 r[i] = (s+i.toString(2)).substr(-c);
    }
	return r;
}

export function getRandNum(){
	var a = new Array(41).fill(0).map((v,i)=>i+1)
	return a.map(v=>{return{v:v, s:Math.random()}}).sort((a,b)=>a.s-b.s).map(o=>o.v).slice(0, 6)
}

// export function patternPro(d, pt1, pt2){
// 	var s = typeof d === "string"? d : d.join('');
// 	var tc=0, okc=0, m;
// 	tc = ((m=s.match(new RegExp(pt1+`[0-1]{${pt2.length}}`, 'g')))||[]).length;
// 	okc = ((m=s.match(new RegExp(pt1+pt2, 'g')))||[]).length;
//
// 	console.error(`${pt1} ${pt2} => ${okc}/${tc}, ${okc/tc}`);
// 	return [pt1, pt2, okc/tc];
// }

//패턴1 출현직후 패턴2가 출현할 확률
export function patternPro(d, pt1, pt2){
	var ns = typeof d === "string"? d : d.join('');
	var i, s=ns;
	var tc=0, c=0;
	while(1){
		i = s.indexOf(pt1);
		if(i == -1){
			break;
    }
		tc++;
		if(s.substr(i+pt1.length, pt2.length) == pt2){
			c++;
    }
    s = s.substr(i+1);
    // if(step && typeof step === "number"){
    // }else{
    //   s = s.substr(i+pt1.length);
    // }
  }
  var p = c/tc;
	console.error(`${pt1} ${pt2} => ${c}/${tc}, ${p}`);
	return {pt1, pt2, c, tc, p};
}

//PB.patternPro(PB.data, "101", "1")

// PB.pattern(4).forEach(pt1=>{
// 	PB.pattern(2).forEach(pt2=>{
// 		PB.patternPro(PB.data, pt1, pt2);
//     })
// })
