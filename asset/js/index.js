const _0x259d78=_0x51aa;(function(_0x1ebb7a,_0xd076c1){const _0x44f79c=_0x51aa,_0x243e6e=_0x1ebb7a();while(!![]){try{const _0x57438d=parseInt(_0x44f79c(0x106))/0x1*(-parseInt(_0x44f79c(0x126))/0x2)+parseInt(_0x44f79c(0x140))/0x3+parseInt(_0x44f79c(0x130))/0x4+parseInt(_0x44f79c(0x105))/0x5+-parseInt(_0x44f79c(0x144))/0x6*(parseInt(_0x44f79c(0xf7))/0x7)+-parseInt(_0x44f79c(0x12d))/0x8+parseInt(_0x44f79c(0x121))/0x9;if(_0x57438d===_0xd076c1)break;else _0x243e6e['push'](_0x243e6e['shift']());}catch(_0xb6f780){_0x243e6e['push'](_0x243e6e['shift']());}}}(_0x6d3d,0xefca2));const lowGradeRatio=0xa,midGradeRatio=0x64,highGradeRatio=0x3e8,midGradePackageSize=0x32,midGradePackagePrice=0x4a38;let experienceData={};fetch(_0x259d78(0x118))[_0x259d78(0x150)](_0x5d72ed=>_0x5d72ed[_0x259d78(0x11e)]())[_0x259d78(0x150)](_0x29fab9=>{experienceData=_0x29fab9;})[_0x259d78(0x14f)](_0x3eb7bd=>{const _0x5b1aa0=_0x259d78;console[_0x5b1aa0(0x12c)]('데이터\x20로드\x20실패:',_0x3eb7bd);}),document[_0x259d78(0xfc)](_0x259d78(0x11d))[_0x259d78(0x104)](_0x259d78(0x109),()=>{const _0x3eabf4=_0x259d78,_0x18dd91=document[_0x3eabf4(0xfc)](_0x3eabf4(0x139))[_0x3eabf4(0x10c)],_0x1c1fbb=parseInt(document['getElementById']('current-level')[_0x3eabf4(0x10c)]),_0x206412=parseInt(document[_0x3eabf4(0xfc)](_0x3eabf4(0x160))[_0x3eabf4(0x10c)]),_0x58bcec=parseInt(document[_0x3eabf4(0xfc)](_0x3eabf4(0x124))['value']),_0x5bfb8f=parseInt(document[_0x3eabf4(0xfc)](_0x3eabf4(0x120))[_0x3eabf4(0x10c)]),_0x3a5aa5=parseInt(document[_0x3eabf4(0xfc)](_0x3eabf4(0x145))['value']);if(_0x1c1fbb>=_0x206412||_0x1c1fbb<0x0||_0x206412>0x19){alert('올바른\x20레벨\x20범위를\x20입력하세요!');return;}let _0x1244d6=0x0;for(let _0x36d5ec=_0x1c1fbb;_0x36d5ec<_0x206412;_0x36d5ec++){_0x1244d6+=experienceData[_0x18dd91][_0x36d5ec][_0x3eabf4(0x154)];}const _0x122248=Math[_0x3eabf4(0x128)](_0x1244d6/lowGradeRatio),_0x3b59c2=Math[_0x3eabf4(0x128)](_0x1244d6/midGradeRatio),_0x3ed579=Math[_0x3eabf4(0x128)](_0x1244d6/highGradeRatio),_0x4004c2=Math[_0x3eabf4(0x128)](_0x3b59c2/midGradePackageSize),_0x328c4d=_0x4004c2*midGradePackagePrice,_0x30db99=Math[_0x3eabf4(0x11c)](0x0,_0x122248-_0x58bcec),_0x4bcfc5=Math[_0x3eabf4(0x11c)](0x0,_0x3b59c2-_0x5bfb8f),_0xcf3fcf=Math[_0x3eabf4(0x11c)](0x0,_0x3ed579-_0x3a5aa5),_0xc16c3e=Math[_0x3eabf4(0x128)](_0x4bcfc5/midGradePackageSize),_0x390c03=_0xc16c3e*midGradePackagePrice,_0x328e48=0x18,_0x5aac46=0x12c,_0xeda8c0=Math[_0x3eabf4(0x128)](_0x30db99/_0x5aac46*_0x328e48),_0x66932=Math[_0x3eabf4(0x147)](_0xeda8c0/0x18),_0x2e6031=_0xeda8c0%0x18,_0x498cab=Math['floor'](_0x66932/0x1e),_0x482712=(_0xeda8c0/(0x18*30.44))[_0x3eabf4(0x103)](0x2);document[_0x3eabf4(0xfc)]('total-exp')['textContent']=_0x1244d6[_0x3eabf4(0x125)](),document['getElementById']('needed-low-soul')[_0x3eabf4(0x101)]=_0x30db99[_0x3eabf4(0x125)](),document[_0x3eabf4(0xfc)](_0x3eabf4(0x10e))[_0x3eabf4(0x101)]=_0x4bcfc5[_0x3eabf4(0x125)](),document[_0x3eabf4(0xfc)](_0x3eabf4(0x10f))[_0x3eabf4(0x101)]=_0xcf3fcf[_0x3eabf4(0x125)](),document[_0x3eabf4(0xfc)]('mid-grade-packages')[_0x3eabf4(0x101)]=_0xc16c3e['toLocaleString'](),document[_0x3eabf4(0xfc)]('mid-grade-price')[_0x3eabf4(0x101)]=_0x390c03[_0x3eabf4(0x125)]();let _0x3ae95e=document[_0x3eabf4(0xfc)](_0x3eabf4(0x152));!_0x3ae95e?(_0x3ae95e=document['createElement']('p'),_0x3ae95e['id']=_0x3eabf4(0x152),_0x3ae95e[_0x3eabf4(0x129)]=_0x3eabf4(0x14d)+_0x66932+'일\x20'+_0x2e6031+_0x3eabf4(0x116)+_0x482712+'개월)</span>',document['getElementById'](_0x3eabf4(0x15d))['appendChild'](_0x3ae95e)):document[_0x3eabf4(0xfc)]('hunting-time')[_0x3eabf4(0x101)]=_0x66932+'일\x20'+_0x2e6031+'시간\x20(약\x20:\x20'+_0x482712+_0x3eabf4(0x15f);const _0x12265e=document['getElementById']('result');_0x12265e[_0x3eabf4(0x110)][_0x3eabf4(0x153)](_0x3eabf4(0x142));});let legendaryData=[],immortalData=[],currentType=_0x259d78(0x159);async function loadData(){const _0x5b83f9=_0x259d78,_0x3b6913=await fetch(_0x5b83f9(0x118)),_0x59fc02=await _0x3b6913[_0x5b83f9(0x11e)]();legendaryData=_0x59fc02['legendary'],immortalData=_0x59fc02[_0x5b83f9(0x123)],currentType=_0x5b83f9(0x159),updateExperienceTable(legendaryData);}document[_0x259d78(0xfc)](_0x259d78(0xf9))['addEventListener'](_0x259d78(0x109),()=>{const _0x5931a1=_0x259d78;currentType=_0x5931a1(0x159),updateExperienceTable(legendaryData);}),document[_0x259d78(0xfc)](_0x259d78(0x151))[_0x259d78(0x104)](_0x259d78(0x109),()=>{const _0x37af3f=_0x259d78;currentType=_0x37af3f(0x123),updateExperienceTable(immortalData);});function updateExperienceTable(_0x565c86){const _0x2001bf=_0x259d78,_0x290382=document[_0x2001bf(0xfc)]('experience-array-container');_0x290382[_0x2001bf(0x129)]='';const _0x541104=_0x565c86[_0x2001bf(0xfa)](0x0,0xd),_0x4f4035=_0x565c86[_0x2001bf(0xfa)](0xd,0x19);let _0x41be3b=_0x2001bf(0xff)+(currentType==='legendary'?_0x2001bf(0x149):_0x2001bf(0x161))+_0x2001bf(0x158);for(let _0x193ed5=0x0;_0x193ed5<0xd;_0x193ed5++){_0x41be3b+=_0x2001bf(0x108)+_0x541104[_0x193ed5][_0x2001bf(0x14a)]+_0x2001bf(0x14b)+_0x541104[_0x193ed5]['experienceRequired'][_0x2001bf(0x125)]()+'</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td>'+(_0x4f4035[_0x193ed5]?.[_0x2001bf(0x14a)]||'')+'</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td>'+(_0x4f4035[_0x193ed5]?.[_0x2001bf(0x154)]?.['toLocaleString']()||'')+'</td>\x0a\x20\x20\x20\x20</tr>';}_0x41be3b+=_0x2001bf(0x122),_0x290382['innerHTML']=_0x41be3b;}loadData();let familiars=[],currentFamiliar=null,currentLevel=0x0;fetch(_0x259d78(0x13d))['then'](_0x21aea1=>_0x21aea1['json']())[_0x259d78(0x150)](_0x2e9c18=>{familiars=_0x2e9c18,displayFamiliarImages('수호');})[_0x259d78(0x14f)](_0x1c32a6=>{const _0x42ba63=_0x259d78;console[_0x42ba63(0x12c)](_0x42ba63(0xfb),_0x1c32a6);});function calculateBoundEffect(_0x50e072,_0x4ede7c,_0x357590){const _0x3636f2=_0x259d78;let _0x4722e1=0x0;if(['대인방어',_0x3636f2(0x134),'위력','체력증가','마력증가'][_0x3636f2(0x12b)](_0x50e072))_0x4722e1=_0x357590<0x9?0.05:_0x357590<0xe?0.15:0.2;else{if(_0x50e072===_0x3636f2(0x146))_0x4722e1=_0x357590<0x9?0.05:_0x357590<0xe?0.05:0.1;else{if([_0x3636f2(0x138),_0x3636f2(0xfe)][_0x3636f2(0x12b)](_0x50e072))_0x4722e1=_0x357590<0xe?0x0:0.052;else{if([_0x3636f2(0x157),_0x3636f2(0x13b),_0x3636f2(0x115),_0x3636f2(0x12e)][_0x3636f2(0x12b)](_0x50e072)){if(_0x357590<0x9)_0x4722e1=0.02;else{if(_0x357590<0xe)_0x4722e1=0.045;else return Math['floor'](_0x4ede7c/14.2);}}else _0x4722e1=_0x357590<0x9?0.05:_0x357590<0xe?0.15:0.25;}}}return Math['floor'](_0x4ede7c*_0x4722e1);}function _0x51aa(_0x477ad2,_0x41184f){const _0x6d3daf=_0x6d3d();return _0x51aa=function(_0x51aa3c,_0x18b423){_0x51aa3c=_0x51aa3c-0xf3;let _0x20d771=_0x6d3daf[_0x51aa3c];return _0x20d771;},_0x51aa(_0x477ad2,_0x41184f);}function displayFamiliarImages(_0x22b6c2){const _0x247086=_0x259d78,_0x2089c3=document[_0x247086(0xfc)](_0x247086(0x117));_0x2089c3[_0x247086(0x129)]='';const _0x343be3=familiars[_0x247086(0x112)](_0x56d2e4=>_0x56d2e4[_0x247086(0x131)]===_0x22b6c2);_0x343be3[_0x247086(0x15c)](_0x2bde0c=>{const _0x5f16bc=_0x247086,_0x239034=document[_0x5f16bc(0x10b)]('img');_0x239034[_0x5f16bc(0x14e)]=_0x5f16bc(0x132)+_0x2bde0c['ic']+_0x5f16bc(0x162),_0x239034['alt']=_0x2bde0c[_0x5f16bc(0x12f)],_0x239034['classList'][_0x5f16bc(0x153)]('familiar-image'),_0x239034[_0x5f16bc(0x104)](_0x5f16bc(0x109),()=>selectFamiliar(_0x2bde0c)),_0x2089c3[_0x5f16bc(0x13a)](_0x239034);}),_0x2089c3[_0x247086(0x135)][_0x247086(0x127)]=_0x247086(0x10a),_0x2089c3[_0x247086(0x135)][_0x247086(0x102)]=_0x247086(0x143),_0x2089c3[_0x247086(0x135)][_0x247086(0x141)]=_0x247086(0x156);}function _0x6d3d(){const _0x2e5f5e=['<table\x20class=\x22experience-table\x22>\x0a\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22','querySelectorAll','textContent','flexWrap','toFixed','addEventListener','266045nUTgQo','1gqxQLI','remove','<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td>','click','flex','createElement','value','color:\x20white;\x20background:\x20#fb8802;\x20padding:\x202px\x205px;\x20border-radius:\x203px;','needed-mid-soul','needed-high-soul','classList','increase-btn','filter','block','btn-tapsung','경험치\x20획득증가','시간\x20(약\x20:\x20','familiar-images','data.json','querySelector','level-input','stats-table','max','calculate','json','color:\x20black;','current-mid-soul','30834630aCPNaS','</tbody></table>','immortal','current-low-soul','toLocaleString','2825614taEvCX','display','ceil','innerHTML','close-btn','includes','error','13654976UESwvS','전리품\x20획득증가','name','5354920MpJTvS','type','images/ic_','color:\x20white;\x20background:\x20#b62b20;\x20padding:\x202px\x205px;\x20border-radius:\x203px;','대인피해','style','.button-group\x20button','level-display','체력증가%','grade-select','appendChild','마력회복향상','option','familiar_data.json','active-button','target','1610490DDnADB','gap','show','wrap','1524JNuVEy','current-high-soul','이동속도','floor','familiar-name','legendary-header','level','</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td>','keys','하계\x202층으로\x20파밍\x20시,\x20소모시간\x20:\x20<span\x20id=\x22hunting-time\x22>\x20','src','catch','then','btn-immortal','hunting-time-element','add','experienceRequired','btn-byeonshin','10px','체력회복향상','\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<th>레벨</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<th>필요\x20경험치</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<th>레벨</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<th>필요\x20경험치</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20<tbody>','legendary','</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20style=\x22margin-left:\x2010px;\x20font-size:\x2014px;\x20font-weight:\x20bold;\x20','.jpg\x22\x20alt=\x22','forEach','result','bound-table','개월)','target-level','immortal-header','.jpg','\x22\x20style=\x22width:\x2040px;\x20height:\x2040px;\x20margin-right:\x2010px;\x20vertical-align:\x20middle;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20style=\x22font-weight:\x20bold;\x20font-size:\x2025px;\x22>','asset/img/ic_','influence','decrease-btn','grade','34531eQXcBW','btn-suhou','btn-legendary','slice','Error\x20loading\x20JSON\x20data:','getElementById','none','마력증가%'];_0x6d3d=function(){return _0x2e5f5e;};return _0x6d3d();}function selectFamiliar(_0x2b2f68){const _0x31191b=_0x259d78;currentFamiliar=_0x2b2f68,currentLevel=0x0;const _0x40c782=_0x31191b(0xf3)+_0x2b2f68[_0x31191b(0xf4)]+_0x31191b(0x162),_0x5dca18=_0x2b2f68[_0x31191b(0xf6)]==='불멸'?_0x31191b(0x10d):_0x2b2f68['grade']==='전설'?_0x31191b(0x133):_0x31191b(0x11f),_0x57f80e=document['getElementById'](_0x31191b(0x148));_0x57f80e[_0x31191b(0x129)]='\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22display:\x20flex;\x20align-items:\x20center;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<img\x20id=\x22familiar-image\x22\x20src=\x22images/ic_'+_0x2b2f68['ic']+_0x31191b(0x15b)+_0x2b2f68[_0x31191b(0x12f)]+_0x31191b(0x163)+_0x2b2f68[_0x31191b(0x12f)]+_0x31191b(0x15a)+_0x5dca18+'\x22>'+_0x2b2f68[_0x31191b(0xf6)]+'</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<img\x20src=\x22'+_0x40c782+'\x22\x20alt=\x22'+_0x2b2f68[_0x31191b(0xf4)]+'\x22\x20style=\x22width:\x2030px;\x20height:\x2030px;\x20margin-left:\x2015px;\x20vertical-align:\x20middle;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20style=\x22margin-left:\x205px;\x20font-size:\x2014px;\x20font-weight:\x20bold;\x22>'+_0x2b2f68[_0x31191b(0xf4)]+'</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22close-btn\x22\x20style=\x22margin-left:\x20auto;\x20background:\x20#f00;\x20color:\x20#fff;\x20border:\x20none;\x20padding:\x205px\x2010px;\x20cursor:\x20pointer;\x22>닫기</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20',document[_0x31191b(0xfc)]('selected-familiar')[_0x31191b(0x135)]['display']='block',document[_0x31191b(0xfc)]('familiar-images')['style'][_0x31191b(0x127)]=_0x31191b(0xfd),updateLevelDisplay(),updateStats(),document[_0x31191b(0xfc)](_0x31191b(0x12a))[_0x31191b(0x104)](_0x31191b(0x109),()=>{const _0x4d8dbb=_0x31191b;document[_0x4d8dbb(0xfc)]('selected-familiar')['style'][_0x4d8dbb(0x127)]=_0x4d8dbb(0xfd),document[_0x4d8dbb(0xfc)](_0x4d8dbb(0x117))[_0x4d8dbb(0x135)][_0x4d8dbb(0x127)]=_0x4d8dbb(0x113),displayFamiliarImages(currentFamiliar[_0x4d8dbb(0x131)]);});}function updateLevelDisplay(){const _0x4d399f=_0x259d78;document[_0x4d399f(0xfc)](_0x4d399f(0x137))['textContent']=currentLevel,document[_0x4d399f(0xfc)](_0x4d399f(0x11a))[_0x4d399f(0x10c)]=currentLevel;}function updateStats(){const _0xdeab50=_0x259d78,_0x224bdd=document[_0xdeab50(0xfc)](_0xdeab50(0x11b))['querySelector']('tbody'),_0x5acf3b=document[_0xdeab50(0xfc)](_0xdeab50(0x15e))[_0xdeab50(0x119)]('tbody');_0x224bdd[_0xdeab50(0x129)]='',_0x5acf3b[_0xdeab50(0x129)]='',Object[_0xdeab50(0x14c)](currentFamiliar[_0xdeab50(0x13c)])[_0xdeab50(0x15c)](_0x59518e=>{const _0x3a39bc=_0xdeab50;let _0x46eb21=currentFamiliar['option'][_0x59518e][currentLevel],_0x3379d=calculateBoundEffect(_0x59518e,_0x46eb21,currentLevel),_0xf965ac=document[_0x3a39bc(0x10b)]('tr'),_0x5d1208=document[_0x3a39bc(0x10b)]('td'),_0xe475a2=document[_0x3a39bc(0x10b)]('td');_0x5d1208[_0x3a39bc(0x101)]=_0x59518e,_0xe475a2['textContent']=_0x46eb21,_0xf965ac[_0x3a39bc(0x13a)](_0x5d1208),_0xf965ac[_0x3a39bc(0x13a)](_0xe475a2),_0x224bdd['appendChild'](_0xf965ac);if(_0x3379d>0x0){let _0x514531=document[_0x3a39bc(0x10b)]('tr'),_0x281a00=document[_0x3a39bc(0x10b)]('td'),_0x5cebf1=document['createElement']('td');_0x281a00[_0x3a39bc(0x101)]=_0x59518e,_0x5cebf1['textContent']=_0x3379d,_0x514531[_0x3a39bc(0x13a)](_0x281a00),_0x514531[_0x3a39bc(0x13a)](_0x5cebf1),_0x5acf3b[_0x3a39bc(0x13a)](_0x514531);}});}document[_0x259d78(0xfc)](_0x259d78(0xf5))[_0x259d78(0x104)]('click',()=>{currentLevel>0x0&&(currentLevel--,updateLevelDisplay(),updateStats(),updateStats());}),document[_0x259d78(0xfc)](_0x259d78(0x111))[_0x259d78(0x104)](_0x259d78(0x109),()=>{currentLevel<0x19&&(currentLevel++,updateLevelDisplay(),updateStats(),updateStats());}),document['getElementById'](_0x259d78(0x11a))[_0x259d78(0x104)]('input',_0x1584a8=>{const _0x55c3da=_0x259d78;let _0x43f4b9=parseInt(_0x1584a8[_0x55c3da(0x13f)]['value']);_0x43f4b9>=0x0&&_0x43f4b9<=0x19&&(currentLevel=_0x43f4b9,updateLevelDisplay(),updateStats(),updateStats());}),document[_0x259d78(0xfc)](_0x259d78(0xf8))['addEventListener'](_0x259d78(0x109),()=>{displayFamiliarImages('수호');}),document['getElementById'](_0x259d78(0x114))['addEventListener'](_0x259d78(0x109),()=>{displayFamiliarImages('탑승');}),document[_0x259d78(0xfc)](_0x259d78(0x155))[_0x259d78(0x104)]('click',()=>{displayFamiliarImages('변신');});function setActiveButton(_0x49f105){const _0x488192=_0x259d78,_0x1af631=document[_0x488192(0x100)](_0x488192(0x136));_0x1af631[_0x488192(0x15c)](_0x1d9c16=>{const _0x485b23=_0x488192;_0x1d9c16[_0x485b23(0x110)][_0x485b23(0x107)](_0x485b23(0x13e));});const _0x41e1ee=document[_0x488192(0xfc)](_0x49f105);_0x41e1ee[_0x488192(0x110)][_0x488192(0x153)](_0x488192(0x13e));}document[_0x259d78(0xfc)](_0x259d78(0xf8))[_0x259d78(0x104)](_0x259d78(0x109),()=>{setActiveButton('btn-suhou'),displayFamiliarImages('수호');}),document['getElementById'](_0x259d78(0x114))[_0x259d78(0x104)]('click',()=>{const _0x2d48b9=_0x259d78;setActiveButton(_0x2d48b9(0x114)),displayFamiliarImages('탑승');}),document[_0x259d78(0xfc)](_0x259d78(0x155))['addEventListener']('click',()=>{const _0xfcc1dc=_0x259d78;setActiveButton(_0xfcc1dc(0x155)),displayFamiliarImages('변신');});