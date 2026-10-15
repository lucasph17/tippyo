/* Personajes ilustrados FICTICIOS para demos y portadas (no son fotos ni personas reales).
   tippyoAvatarSVG(i) -> texto SVG · tippyoAvatarURL(i) -> data URL · tippyoAvatarCount = nº de variantes.
   Solo atributos (sin <style>), para que el SVG se pueda subir a cualquier sitio. */
(function(G){
  var P=[
    {n:'Ana',   sk:'#f3cfae',sh:'#e2b08a',hr:'#3a2417',st:'bun',   bg:'#7cbbdf',vs:'#1d2b36',bt:'#a3232f',ex:''},
    {n:'Marc',  sk:'#d9a07a',sh:'#c28660',hr:'#1c1411',st:'short', bg:'#f2c14e',vs:'#7a1f2b',bt:'#1c1411',ex:'beard'},
    {n:'Lía',   sk:'#f1c9a5',sh:'#dfa982',hr:'#9a4a1f',st:'long',  bg:'#8bd49a',vs:'#245a45',bt:'#f2c14e',ex:''},
    {n:'Carlos',sk:'#8d5a3b',sh:'#774828',hr:'#120d0b',st:'curly', bg:'#e49b7b',vs:'#17304a',bt:'#a3232f',ex:''},
    {n:'Sofía', sk:'#f6d9bd',sh:'#e5bd97',hr:'#d1a24a',st:'bob',   bg:'#b9a7e8',vs:'#2e3640',bt:'#7cbbdf',ex:'glasses'},
    {n:'Hugo',  sk:'#d6a07c',sh:'#bd8660',hr:'#2d2018',st:'cap',   bg:'#9fc5e8',vs:'#5a3d2b',bt:'#f2c14e',ex:'beard'},
    {n:'Youssef',sk:'#b97d55',sh:'#a2683f',hr:'#17110e',st:'short',bg:'#f6d27a',vs:'#1f4a3a',bt:'#a3232f',ex:'beard'},
    {n:'Marta', sk:'#5f3b29',sh:'#4d2e1f',hr:'#0e0a09',st:'puff',  bg:'#f4a6a6',vs:'#6b1f3a',bt:'#f2c14e',ex:''}
  ];
  function hairBack(p){
    if(p.st==='bun')return '<circle cx="120" cy="52" r="21" fill="'+p.hr+'"/>';
    if(p.st==='long')return '<path d="M74 110C66 48 174 48 166 110L176 184C152 176 152 154 150 142L90 142C88 154 88 176 64 184Z" fill="'+p.hr+'"/>';
    if(p.st==='bob')return '<path d="M74 108C68 56 172 56 166 108L170 150C150 156 148 140 148 130L92 130C92 140 90 156 70 150Z" fill="'+p.hr+'"/>';
    if(p.st==='puff')return '<circle cx="120" cy="74" r="56" fill="'+p.hr+'"/>';
    return '';
  }
  function hairFront(p){
    var c=p.hr;
    if(p.st==='short'||p.st==='bun')return '<path d="M76 110C68 62 100 52 120 52C146 52 174 62 164 110C158 90 146 80 120 80C96 80 82 90 76 110Z" fill="'+c+'"/>';
    if(p.st==='long'||p.st==='bob')return '<path d="M78 106C76 68 100 58 124 58C148 58 166 70 162 106C152 86 140 76 120 76C100 76 88 86 78 106Z" fill="'+c+'"/>';
    if(p.st==='curly')return '<g fill="'+c+'"><circle cx="84" cy="88" r="17"/><circle cx="104" cy="68" r="19"/><circle cx="130" cy="64" r="19"/><circle cx="153" cy="76" r="18"/><circle cx="165" cy="98" r="14"/><circle cx="76" cy="106" r="13"/></g>';
    if(p.st==='cap')return '<path d="M76 100C78 52 162 52 164 100Z" fill="#26323c"/><rect x="70" y="94" width="108" height="13" rx="6.5" fill="#1c262e"/><rect x="108" y="70" width="24" height="9" rx="4.5" fill="#7cbbdf"/>';
    if(p.st==='puff')return '<path d="M80 96C84 74 156 74 160 96C150 86 90 86 80 96Z" fill="'+c+'"/>';
    return '';
  }
  function build(i){
    var p=P[((i%P.length)+P.length)%P.length],id='c'+(((i%P.length)+P.length)%P.length);
    var beard=p.ex==='beard'?'<path d="M80 114C80 158 100 172 120 172C140 172 160 158 160 114C152 138 138 148 120 148C102 148 88 138 80 114Z" fill="'+p.hr+'"/>':'';
    var glasses=p.ex==='glasses'?'<g fill="none" stroke="#2a1d18" stroke-width="3.5"><circle cx="103" cy="110" r="13"/><circle cx="137" cy="110" r="13"/><path d="M116 110h8"/></g>':'';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240" role="img" aria-label="Persona ficticia">'
      +'<defs><clipPath id="'+id+'"><rect width="240" height="240" rx="52"/></clipPath></defs>'
      +'<g clip-path="url(#'+id+')">'
      +'<rect width="240" height="240" fill="'+p.bg+'"/>'
      +'<circle cx="196" cy="48" r="64" fill="#ffffff" fill-opacity="0.16"/>'
      +hairBack(p)
      +'<rect x="105" y="144" width="30" height="36" rx="12" fill="'+p.sh+'"/>'
      +'<path d="M24 240C24 198 64 176 120 176C176 176 216 198 216 240Z" fill="#f4f7fa"/>'
      +'<path d="M60 198C80 184 100 178 120 178C140 178 160 184 180 198L192 240L48 240Z" fill="'+p.vs+'"/>'
      +'<path d="M100 178L120 212L140 178Z" fill="#f4f7fa"/>'
      +'<path d="M120 188L100 178L100 198Z M120 188L140 178L140 198Z" fill="'+p.bt+'"/><rect x="115" y="183" width="10" height="10" rx="3" fill="'+p.bt+'"/>'
      +'<circle cx="77" cy="116" r="9" fill="'+p.sh+'"/><circle cx="163" cy="116" r="9" fill="'+p.sh+'"/>'
      +'<ellipse cx="120" cy="112" rx="43" ry="49" fill="'+p.sk+'"/>'
      +beard
      +'<circle cx="92" cy="128" r="8" fill="#e8847a" fill-opacity="0.28"/><circle cx="148" cy="128" r="8" fill="#e8847a" fill-opacity="0.28"/>'
      +'<circle cx="104" cy="110" r="4.8" fill="#2a1d18"/><circle cx="136" cy="110" r="4.8" fill="#2a1d18"/>'
      +'<circle cx="105.6" cy="108.4" r="1.5" fill="#ffffff"/><circle cx="137.6" cy="108.4" r="1.5" fill="#ffffff"/>'
      +'<path d="M95 97Q104 91 113 97M127 97Q136 91 145 97" fill="none" stroke="'+(p.st==='puff'||p.st==='curly'?p.hr:'#3a2a20')+'" stroke-width="3.6" stroke-linecap="round"/>'
      +'<path d="M120 114Q125 124 118 127" fill="none" stroke="'+p.sh+'" stroke-width="3.4" stroke-linecap="round"/>'
      +'<path d="M104 132Q120 147 136 132" fill="none" stroke="#8a3d2e" stroke-width="4.4" stroke-linecap="round"/>'
      +glasses
      +hairFront(p)
      +'</g></svg>';
  }
  G.tippyoAvatarCount=P.length;
  G.tippyoAvatarName=function(i){return P[((i%P.length)+P.length)%P.length].n};
  G.tippyoAvatarSVG=build;
  G.tippyoAvatarURL=function(i){return 'data:image/svg+xml,'+encodeURIComponent(build(i))};
})(typeof window!=='undefined'?window:globalThis);
