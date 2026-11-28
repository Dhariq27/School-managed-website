/* ===== v6: attendance shows weekday with date (computed, never hardcoded) + daily/monthly report ===== */
const _pd=d=>new Date(d+'T00:00');
const dayName=d=>_pd(d).toLocaleDateString('en-US',{weekday:'long'});
const _mo=d=>_pd(d).toLocaleDateString('en-US',{month:'long'});
const dayDate=d=>d?dayName(d)+', '+_pd(d).getDate()+' '+_mo(d)+' '+_pd(d).getFullYear():'';
const dayShort=d=>d?_pd(d).getDate()+' '+_mo(d).slice(0,3)+' '+_pd(d).getFullYear()+' ('+dayName(d)+')':'';
const attCounts=(k,d)=>{const c={P:0,A:0,L:0,V:0};S.stu.filter(s=>s.cls==k).forEach(s=>{const v=(S.att[d]||{})[s.id];if(v)c[v]++});return c};
const attDates=(k,m)=>Object.keys(S.att).filter(d=>(!m||d.startsWith(m))&&S.stu.some(s=>s.cls==k&&S.att[d][s.id])).sort();
const oldAtt=PG.att;
PG.att=()=>{const h=oldAtt();if(me().role=='student')return h;const k=ui.cls,m=ui.am||today().slice(0,7),ds=attDates(k,m).reverse();return h+`<div class="card" style="margin-top:12px"><h3>Daily &amp; monthly attendance report – ${clsL(k)}</h3><div class="row"><label>Month<input type="month" value="${m}" onchange="A.ui('am',this.value)"></label><button class="btn gh sm" onclick="A.attCsv()">Export CSV</button></div>${tbl(['Date','Present','Absent','Late','Leave',''],ds.map(d=>{const c=attCounts(k,d);return[dayShort(d),c.P,c.A,c.L,c.V,`<button class="btn gh sm" onclick="A.attGo('${d}')">Open</button>`]}))}</div>`};
A.attGo=d=>{ui.date=d;draw();scrollTo(0,0)};
A.attCsv=()=>{const k=ui.cls,m=ui.am||today().slice(0,7);csv('attendance_'+k+'_'+m,[['Date','Day','Class','Present','Absent','Late','Leave'],...attDates(k,m).map(d=>{const c=attCounts(k,d);return[d,dayName(d),k,c.P,c.A,c.L,c.V]})])};
A.attAll=()=>csv('attendance_by_date',[['Date','Day','Class','Present','Absent','Late','Leave'],...Object.keys(S.att).sort().flatMap(d=>classes().filter(k=>S.stu.some(s=>s.cls==k&&S.att[d][s.id])).map(k=>{const c=attCounts(k,d);return[d,dayName(d),k,c.P,c.A,c.L,c.V]}))]);
const oldRep=PG.rep;
PG.rep=()=>oldRep()+`<div class="card" style="margin-top:12px"><h3>Daily attendance with weekday</h3><button class="btn sm" onclick="A.attAll()">Export CSV (all classes, by date)</button></div>`;
