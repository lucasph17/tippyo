/* Vista previa SOLO en local: ?preview=jefe | jefe0 | trabajador | nuevo | cliente | anon
   Sustituye a Supabase por datos de ejemplo en memoria. Sin red, sin cuentas, sin contraseñas.
   En cualquier otro dominio no hace nada. */
(function(){
  const modo=new URLSearchParams(location.search).get('preview');
  if(!modo||!/^(localhost|127\.0\.0\.1)$/.test(location.hostname))return;

  const hoy=()=>new Date().toLocaleDateString('sv-SE',{timeZone:'Europe/Madrid'});
  const uid=()=>crypto.randomUUID();
  const CO='c0000000-0000-0000-0000-000000000001',CO2='c0000000-0000-0000-0000-000000000002';
  const dias=n=>new Date(Date.now()-n*864e5).toISOString();
  const svg=(c)=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${c}"/><circle cx="32" cy="25" r="11" fill="#fff" opacity=".85"/><path d="M10 64c2-17 14-24 22-24s20 7 22 24z" fill="#fff" opacity=".85"/></svg>`);

  const U={
    jefe:{id:'a0000000-0000-0000-0000-0000000000f1',email:'jefe@demo.invalid'},jefe0:{id:'a0000000-0000-0000-0000-0000000000f0',email:'jefe@demo.invalid'},
    trabajador:{id:'a0000000-0000-0000-0000-0000000000a1',email:'ana@demo.invalid'},cliente1:{id:'a0000000-0000-0000-0000-0000000000c1',email:'cliente@demo.invalid'},nuevo:{id:'a0000000-0000-0000-0000-0000000000a4',email:'nuevo@demo.invalid'}};
  let user=U[modo]||null;

  const DB={
    companies:[{id:CO,owner_id:'a0000000-0000-0000-0000-0000000000f1',name:'Bar La Lola',city:'Valencia',address:null,description:null},
               {id:CO2,owner_id:'a0000000-0000-0000-0000-0000000000f2',name:'Cafetería Mar',city:'Castellón',address:null,description:null}],
    profiles:[
      {id:'a0000000-0000-0000-0000-0000000000a1',full_name:'Ana Pérez',job_title:'Camarera',photo_url:svg('#d98a6c'),photo_pending_url:svg('#d98a6c'),share_history:false},
      {id:'a0000000-0000-0000-0000-0000000000a2',full_name:'Marc Soler',job_title:'Barra',photo_url:null,photo_pending_url:svg('#5f8fb3'),share_history:false},
      {id:'a0000000-0000-0000-0000-0000000000a3',full_name:'Lía Gómez',job_title:'Cocina',photo_url:svg('#7aa874'),photo_pending_url:svg('#7aa874'),share_history:false}],
    stints:[
      {id:'s0',company_id:CO2,worker_id:'a0000000-0000-0000-0000-0000000000a1',job_title:'Camarera',started_at:dias(160),ended_at:dias(70)},
      {id:'s1',company_id:CO,worker_id:'a0000000-0000-0000-0000-0000000000a1',job_title:'Camarera',started_at:dias(60),ended_at:null},
      {id:'s2',company_id:CO,worker_id:'a0000000-0000-0000-0000-0000000000a2',job_title:'Barra',started_at:dias(30),ended_at:null},
      {id:'s3',company_id:CO,worker_id:'a0000000-0000-0000-0000-0000000000a3',job_title:'Cocina',started_at:dias(9),ended_at:null}],
    access_codes:[{code:'LA-K7M2',company_id:CO,used_by:null,created_at:dias(1)},{code:'LA-X9PQ',company_id:CO,used_by:'a0000000-0000-0000-0000-0000000000a3',created_at:dias(9)}],
    shifts:[{stint_id:'s1',day:hoy()},{stint_id:'s2',day:hoy()}],
    dining_tables:[1,2,3,4].map(n=>({company_id:CO,table_no:n,token:'demo'+n})),
    ratings:[
      ...[5,5,4,5,5,4,5].map((s,i)=>({stint_id:'s1',stars:s,comment:['Rapidísima y muy simpática','','Todo perfecto','Nos recomendó un vino buenísimo','','Atenta en todo momento','Gracias'][i],created_at:dias(i),device_id:'x'+i})),
      ...[4,5].map((s,i)=>({stint_id:'s2',stars:s,comment:i?'Muy buen café':'',created_at:dias(i+2),device_id:'y'+i})),
      ...[4,4,5].map((s,i)=>({stint_id:'s0',stars:s,comment:'',created_at:dias(80+i),device_id:'z'+i}))]
  };
  DB.ratings.forEach((r,i)=>r.id='r'+i);DB.reports=[];
  DB.rewards=[{id:'rw1',company_id:CO,name:'Café gratis',cost:5,active:true},{id:'rw2',company_id:CO,name:'Postre de la casa',cost:10,active:true}];
  DB.point_events=[];DB.redemptions=[];DB.tippyo_points=[];DB.platform_redemptions=[];
  DB.platform_rewards=[
    {id:'pr1',brand:'Marca de ejemplo A',name:'10 % de descuento (ejemplo)',description:'',cost:10,active:true,codes:['EJ-A1','EJ-A2']},
    {id:'pr2',brand:'Marca de ejemplo B',name:'Café y bollo (ejemplo)',description:'',cost:25,active:true,codes:['EJ-B1']}];
  if(modo==='jefe')DB.redemptions.push({id:'d9',user_id:'x',company_id:CO,reward_id:'rw1',reward_name:'Café gratis',cost:5,code:'C-7K9P2Q',created_at:dias(0),used_at:null});
  if(modo==='cliente1'){
    for(let i=0;i<18;i++)DB.point_events.push({user_id:U.cliente1.id,company_id:CO,stint_id:'s'+(i%3+1),day:'2026-09-'+String(10+i),points:1});
    for(let i=0;i<22;i++)DB.tippyo_points.push({user_id:U.cliente1.id,company_id:CO,stint_id:'t'+i,day:'2026-09-'+String(1+i),points:1,avail:i<20?0:Date.now()+2*864e5});
    DB.platform_redemptions.push({id:'q1',user_id:U.cliente1.id,reward_id:'pr1',brand:'Marca de ejemplo A',name:'10 % de descuento (ejemplo)',cost:5,code:'EJ-USADO',created_at:dias(5)});
    DB.redemptions.push({id:'d1',user_id:U.cliente1.id,company_id:CO,reward_id:'rw1',reward_name:'Café gratis',cost:5,code:'C-A1B2C3',created_at:dias(3),used_at:dias(2)});
    DB.redemptions.push({id:'d2',user_id:U.cliente1.id,company_id:CO,reward_id:'rw1',reward_name:'Café gratis',cost:5,code:'C-D4E5F6',created_at:dias(0),used_at:null});
  }
  if(modo==='jefe0')DB.companies=DB.companies.filter(c=>c.id!==CO);

  const proj=(r,cols)=>{
    if(cols==='*')return {...r};
    const emb=[...cols.matchAll(/(\w+)\(([^)]*)\)/g)];
    const out={};
    cols.replace(/\w+\([^)]*\)/g,'').split(',').map(s=>s.trim()).filter(Boolean).forEach(k=>out[k]=r[k]);
    emb.forEach(([,n,c])=>{const fk=n==='profiles'?r.worker_id:r.company_id;const x=DB[n].find(z=>z.id===fk);out[n]=x?proj(x,c):null});
    return out;
  };
  const defaults={
    companies:r=>({id:uid(),...r}),
    profiles:r=>({photo_url:null,photo_pending_url:null,share_history:false,...r}),
    shifts:r=>({day:hoy(),...r}),
    rewards:r=>({id:uid(),active:true,...r}),
    access_codes:r=>({used_by:null,created_at:new Date().toISOString(),...r}),
    dining_tables:r=>({token:Math.random().toString(36).slice(2,10),...r})};
  const wait=ms=>new Promise(r=>setTimeout(r,ms));

  async function run(o){
    await wait(160);
    const T=DB[o.t];let rows;
    const f=r=>o.f.every(fn=>fn(r));
    if(o.op==='insert'||o.op==='upsert'){
      for(const p of [].concat(o.pay)){
        if(o.t==='access_codes'&&T.some(x=>x.code===p.code))return {data:null,error:{message:'duplicate key value violates unique constraint'}};
        if(o.op==='upsert'&&T.some(x=>x.company_id===p.company_id&&x.table_no===p.table_no))continue;
        T.push((defaults[o.t]||(r=>r))(p));
      }
      return {data:null,error:null};
    }
    if(o.op==='update'){T.filter(f).forEach(r=>Object.assign(r,o.pay));return {data:null,error:null}}
    if(o.op==='delete'){DB[o.t]=T.filter(r=>!f(r));return {data:null,error:null}}
    rows=T.filter(f);
    if(o.ord){const[k,asc]=o.ord;rows=[...rows].sort((a,b)=>(a[k]>b[k]?1:a[k]<b[k]?-1:0)*(asc?1:-1))}
    if(o.lim)rows=rows.slice(0,o.lim);
    rows=rows.map(r=>proj(r,o.cols));
    return {data:o.single?(rows[0]||null):rows,error:null};
  }
  const Q=t=>{
    const o={t,op:'select',cols:'*',f:[],ord:null,lim:null,single:false,pay:null};
    const a={
      select(c){o.cols=c||'*';return a},insert(p){o.op='insert';o.pay=p;return a},update(p){o.op='update';o.pay=p;return a},
      delete(){o.op='delete';return a},upsert(p){o.op='upsert';o.pay=p;return a},
      eq(k,v){o.f.push(r=>r[k]===v);return a},is(k,v){o.f.push(r=>(r[k]==null)===(v===null));return a},in(k,l){o.f.push(r=>l.includes(r[k]));return a},
      order(k,x){o.ord=[k,!x||x.ascending!==false];return a},limit(n){o.lim=n;return a},maybeSingle(){o.single=true;return a},
      then(ok,ko){return run(o).then(ok,ko)}};
    return a;
  };
  const err=m=>({data:null,error:{message:m}});
  const award=(uid_,stint)=>{
    const st=DB.stints.find(s=>s.id===stint),co=st&&st.company_id,hoy_=hoy();
    const ow=DB.companies.find(c=>c.id===co);
    if(!co||!DB.rewards.some(r=>r.company_id===co&&r.active))return 0;
    if((ow&&ow.owner_id===uid_)||DB.stints.some(s=>s.worker_id===uid_&&s.company_id===co))return 0;
    if(DB.point_events.filter(e=>e.user_id===uid_&&e.company_id===co&&e.day===hoy_).length>=3)return 0;
    if(DB.point_events.some(e=>e.user_id===uid_&&e.stint_id===stint&&e.day===hoy_))return 0;
    DB.point_events.push({user_id:uid_,company_id:co,stint_id:stint,day:hoy_,points:1});return 1;
  };
  const awardG=(u,stint)=>{
    const st=DB.stints.find(s=>s.id===stint),co=st&&st.company_id,hoy_=hoy(),ow=DB.companies.find(c=>c.id===co);
    if(co!==CO)return 0;
    if((ow&&ow.owner_id===u)||DB.stints.some(s=>s.worker_id===u&&s.company_id===co))return 0;
    if(DB.tippyo_points.filter(e=>e.user_id===u&&e.day===hoy_).length>=3)return 0;
    if(DB.tippyo_points.some(e=>e.user_id===u&&e.stint_id===stint&&e.day===hoy_))return 0;
    DB.tippyo_points.push({user_id:u,company_id:co,stint_id:stint,day:hoy_,points:1,avail:Date.now()+3*864e5});return 1;
  };
  const wallet=u=>({available:DB.tippyo_points.filter(e=>e.user_id===u&&e.avail<=Date.now()).reduce((x,e)=>x+e.points,0)-DB.platform_redemptions.filter(d=>d.user_id===u).reduce((x,d)=>x+d.cost,0),
                    pending:DB.tippyo_points.filter(e=>e.user_id===u&&e.avail>Date.now()).reduce((x,e)=>x+e.points,0)});
  const saldo=(u,c)=>DB.point_events.filter(e=>e.user_id===u&&e.company_id===c).reduce((x,e)=>x+e.points,0)-DB.redemptions.filter(d=>d.user_id===u&&d.company_id===c).reduce((x,d)=>x+d.cost,0);
  const rpc=async(n,p)=>{
    await wait(160);
    if(n==='who_is_on_shift'){
      if(!DB.dining_tables.some(t=>t.company_id===p.p_company&&t.table_no===p.p_table&&t.token===p.p_token))return {data:[],error:null};
      const ids=DB.shifts.filter(s=>s.day===hoy()).map(s=>s.stint_id),auto=(DB.companies.find(c=>c.id===p.p_company)||{}).auto_shift;
      return {data:DB.stints.filter(s=>!s.ended_at&&s.company_id===p.p_company&&(auto||ids.includes(s.id))).map(s=>{const w=DB.profiles.find(x=>x.id===s.worker_id);return {stint_id:s.id,full_name:w.full_name,job_title:s.job_title,photo_url:w.photo_url}}),error:null};
    }
    if(n==='submit_rating'){
      if(DB.ratings.some(r=>r.stint_id===p.p_stint&&r.device_id===p.p_device))return err('duplicate key value violates unique constraint "ratings_stint_id_day_device_id_key"');
      DB.ratings.unshift({id:uid(),stint_id:p.p_stint,stars:p.p_stars,comment:p.p_comment,created_at:new Date().toISOString(),device_id:p.p_device});
      return {data:user?{local:award(user.id,p.p_stint),tippyo:awardG(user.id,p.p_stint)}:{local:0,tippyo:0},error:null};
    }
    if(n==='end_stint'){DB.stints.find(s=>s.id===p.p_stint).ended_at=new Date().toISOString();return {data:null,error:null}}
    if(n==='approve_photo'){const w=DB.profiles.find(x=>x.id===p.p_worker);w.photo_url=w.photo_pending_url;return {data:null,error:null}}
    if(n==='reject_photo'){DB.profiles.find(x=>x.id===p.p_worker).photo_pending_url=null;return {data:null,error:null}}
    if(n==='redeem_code'){
      const c=DB.access_codes.find(x=>x.code===String(p.p_code).trim().toUpperCase()&&!x.used_by);
      if(!c)return err('invalid_or_used_code');
      c.used_by=user.id;const pf=DB.profiles.find(x=>x.id===user.id);
      DB.stints.push({id:uid(),company_id:c.company_id,worker_id:user.id,job_title:pf.job_title,started_at:new Date().toISOString(),ended_at:null});
      return {data:null,error:null};
    }
    if(n==='claim_points')return {data:{local:0,tippyo:0},error:null};
    if(n==='perks')return {data:{local:DB.rewards.some(r=>r.company_id===p.p_company&&r.active),tippyo:p.p_company===CO},error:null};
    if(n==='tippyo_wallet')return {data:wallet(user.id),error:null};
    if(n==='redeem_platform'){
      const rw=DB.platform_rewards.find(r=>r.id===p.p_reward&&r.active);if(!rw)return err('invalid_reward');
      if(wallet(user.id).available<rw.cost)return err('not_enough_points');
      const code=rw.codes.shift();if(!code)return err('sold_out');
      DB.platform_redemptions.push({id:uid(),user_id:user.id,reward_id:rw.id,brand:rw.brand,name:rw.name,cost:rw.cost,code,created_at:new Date().toISOString()});
      return {data:{code,brand:rw.brand,name:rw.name},error:null};
    }
    if(n==='my_points'){
      const ids=[...new Set([...DB.point_events,...DB.redemptions].filter(x=>x.user_id===user.id).map(x=>x.company_id))];
      return {data:ids.map(id=>{const c=DB.companies.find(x=>x.id===id);return {company_id:id,company_name:c.name,city:c.city,points:saldo(user.id,id)}}),error:null};
    }
    if(n==='redeem_reward'){
      const rw=DB.rewards.find(r=>r.id===p.p_reward&&r.active);if(!rw)return err('invalid_reward');
      if(saldo(user.id,rw.company_id)<rw.cost)return err('not_enough_points');
      const code='C-'+Math.random().toString(16).slice(2,8).toUpperCase();
      DB.redemptions.push({id:uid(),user_id:user.id,company_id:rw.company_id,reward_id:rw.id,reward_name:rw.name,cost:rw.cost,code,created_at:new Date().toISOString(),used_at:null});
      return {data:code,error:null};
    }
    if(n==='company_redemptions')return {data:DB.redemptions.filter(d=>d.company_id===p.p_company).map(({id,reward_name,code,created_at,used_at})=>({id,reward_name,code,created_at,used_at})),error:null};
    if(n==='use_redemption'){const d=DB.redemptions.find(x=>x.code===String(p.p_code).trim().toUpperCase()&&!x.used_at);if(!d)return err('invalid_coupon');d.used_at=new Date().toISOString();return {data:null,error:null}}
    if(n==='delete_my_account'){
      if(DB.companies.some(c=>c.owner_id===user.id&&DB.stints.some(s=>s.company_id===c.id&&!s.ended_at)))return err('has_team');
      DB.profiles=DB.profiles.filter(x=>x.id!==user.id);DB.stints=DB.stints.filter(s=>s.worker_id!==user.id);
      user=null;cb&&cb('SIGNED_OUT',null);return {data:null,error:null};
    }
    if(n==='public_certificate'){
      const pr=DB.profiles.find(x=>x.id===p.p_worker);
      if(!pr||!pr.share_history)return {data:null,error:null};
      const med=a=>a.length?Math.round(a.reduce((x,r)=>x+r.stars,0)/a.length*100)/100:null;
      const st=DB.stints.filter(s=>s.worker_id===pr.id).sort((a,b)=>a.started_at<b.started_at?1:-1);
      const todas=DB.ratings.filter(r=>st.some(s=>s.id===r.stint_id));
      return {data:{full_name:pr.full_name,job_title:pr.job_title,photo_url:pr.photo_url,avg:med(todas),n:todas.length,
        stints:st.map(s=>{const rs=DB.ratings.filter(r=>r.stint_id===s.id),c=DB.companies.find(x=>x.id===s.company_id);
          return {company:c.name,city:c.city,from:s.started_at.slice(0,10),to:s.ended_at?s.ended_at.slice(0,10):null,avg:med(rs),n:rs.length}})},error:null};
    }
    return err('rpc desconocida: '+n);
  };

  let cb=null;
  const auth={
    getSession:async()=>({data:{session:user?{user}:null}}),
    onAuthStateChange(f){cb=f;setTimeout(()=>f('INITIAL_SESSION',user?{user}:null),0);return {data:{subscription:{unsubscribe(){}}}}},
    resetPasswordForEmail:async()=>({data:{},error:null}),updateUser:async()=>({data:{},error:null}),signOut:async()=>{user=null;cb&&cb('SIGNED_OUT',null);return {error:null}},
    signUp:async()=>({data:{session:null},error:null}),
    signInWithPassword:async()=>{user=U[modo]||U.jefe;cb&&cb('SIGNED_IN',{user});return {error:null}}};
  const storage={from:()=>({list:async()=>({data:[],error:null}),remove:async()=>({data:[],error:null}),upload:async()=>({error:null}),getPublicUrl:()=>({data:{publicUrl:svg('#8a7fc0')}})})};

  window.TIPPYO_PREVIEW={modo,client:{from:Q,rpc,auth,storage},CO};
})();
