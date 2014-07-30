webshims.register("mediaelement-yt",function(a,b,c,d,e){"use strict";var f=b.mediaelement,g=a.Deferred();c.onYouTubePlayerAPIReady=function(){g.resolve()},c.YT&&YT.Player&&c.onYouTubePlayerAPIReady();var h={paused:!0,ended:!1,currentSrc:"",duration:c.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:{start:function(a){return a?void b.error("buffered index size error"):0},end:function(a){return a?void b.error("buffered index size error"):0},length:0}},i=Object.keys(h),j={currentTime:0,volume:1,muted:!1},k=(Object.keys(j),a.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_metadata:!1,_callMeta:!1,currentTime:0,_buffered:0,_ppFlag:e},h,j)),l=function(b,c){c=a.Event(c),c.preventDefault(),a.event.trigger(c,e,b)},m=function(){var a=["_buffered","_metadata","_ppFlag","currentSrc","currentTime","duration","ended","networkState","paused","videoHeight","videoWidth","_callMeta"],b=a.length;return function(c){if(c){var d=b,e=c.networkState;for(c.readyState=0;--d;)delete c[a[d]];c.buffered.length=0,clearInterval(c._timeInterval),e&&l(c._elem,"emptied")}}}(),n=function(){var b={},e=function(c){var e,f,g;return b[c.currentSrc]?e=b[c.currentSrc]:c.videoHeight&&c.videoWidth?(b[c.currentSrc]={width:c.videoWidth,height:c.videoHeight},e=b[c.currentSrc]):(f=a.attr(c._elem,"poster"))&&(e=b[f],e||(g=d.createElement("img"),g.onload=function(){b[f]={width:this.width,height:this.height},b[f].height&&b[f].width?o(c,a.prop(c._elem,"controls")):delete b[f],g.onload=null},g.src=f,g.complete&&g.onload&&g.onload())),e||{width:300,height:"video"==c._elemNodeName?150:50}},f=function(a,b){return a.style[b]||a.currentStyle&&a.currentStyle[b]||c.getComputedStyle&&(c.getComputedStyle(a,null)||{})[b]||""},g=["minWidth","maxWidth","minHeight","maxHeight"],h=function(a,b){var c,d,e=!1;for(c=0;4>c;c++)d=f(a,g[c]),parseFloat(d,10)&&(e=!0,b[g[c]]=d);return e},i=function(b){var c,d,g=b._elem,i={width:"auto"==f(g,"width"),height:"auto"==f(g,"height")},j={width:!i.width&&a(g).width(),height:!i.height&&a(g).height()};return(i.width||i.height)&&(c=e(b),d=c.width/c.height,i.width&&i.height?(j.width=c.width,j.height=c.height):i.width?j.width=j.height*d:i.height&&(j.height=j.width/d),h(g,j)&&(b.shadowElem.css(j),i.width&&(j.width=b.shadowElem.height()*d),i.height&&(j.height=(i.width?j.width:b.shadowElem.width())/d),i.width&&i.height&&(b.shadowElem.css(j),j.height=b.shadowElem.width()/d,j.width=j.height*d,b.shadowElem.css(j),j.width=b.shadowElem.height()*d,j.height=j.width/d))),j};return i}(),o=function(a){var b,d=(a._elem,a.shadowElem);"third"==a.isActive&&(a&&a._ytAPI&&a._ytAPI.getPlaybackQuality&&(c.ytapi=a._ytAPI),a._elem.style.display="",b=n(a),a._elem.style.display="none",d.css(b))},p=function(a){try{a.nodeName}catch(c){return null}var d=b.data(a,"mediaelement");return d&&"third"==d.isActive?d:null},q=/vq\=(small|medium|large|hd720|hd1080|highres)/i,r=function(c){var d,e=(c.match(q)||["",""])[1].toLowerCase();return c=c.split("?"),-1!=c[0].indexOf("youtube.com/watch")&&c[1]?(c=c[1].split("&"),a.each(c,function(a,b){return b=b.split("="),"v"==b[0]?(c=b[1],d=!0,!1):void 0})):-1!=c[0].indexOf("youtube.com/v/")&&(c=c[0].split("/"),a.each(c,function(a,b){return d?(c=b,!1):void("v"==b&&(d=!0))})),d||b.error("no youtube id found: "+c),{videoId:c,suggestedQuality:e}},s=function(b){b&&(b._ppFlag===e&&a.prop(b._elem,"autoplay")||!b.paused)&&setTimeout(function(){if("third"==b.isActive&&(b._ppFlag===e||!b.paused))try{a(b._elem).play()}catch(c){}},1)},t=a.noop;!function(){var c={play:1,playing:1},e=["play","pause","playing","canplay","progress","waiting","ended","loadedmetadata","loadstart","durationchange","emptied"],f=e.map(function(a){return a+".webshimspolyfill"}).join(" "),g=function(d){var e=b.data(d.target,"mediaelement");if(e){var f=d.originalEvent&&d.originalEvent.type===d.type;f==("third"==e.activating)&&(d.stopImmediatePropagation(),c[d.type]&&e.isActive!=e.activating&&a(d.target).pause())}};(t=function(c){a(c).off(f).on(f,g),e.forEach(function(a){b.moveToFirstEvent(c,a)})})(d)}(),a(d).on("emptied",function(a){var b=p(a.target);s(b)}),f.setActive=function(c,d,e){if(e||(e=b.data(c,"mediaelement")),e&&e.isActive!=d){"html5"!=d&&"third"!=d&&b.warn("wrong type for mediaelement activating: "+d);var f=b.data(c,"shadowData");e.activating=d,a(c).pause(),e.isActive=d,"third"==d?(f.shadowElement=f.shadowFocusElement=e.shadowElem[0],a(c).addClass("yt-api-active nonnative-api-active").hide().getShadowElement().show()):(clearInterval(e._timeInterval),a(c).removeClass("yt-api-active nonnative-api-active").show().getShadowElement().hide(),f.shadowElement=f.shadowFocusElement=!1),a(c).trigger("mediaelementapichange")}};var u=function(b,c){c._ppFlag=!0,"playing"==b&&(u("play",c),c.readyState<3&&(c.readyState=3,l(c._elem,"canplay")),a(c._elem).trigger("playing")),"play"==b&&c.paused?(c.paused=!1,l(c._elem,"play")):"pause"!=b||c.paused||(c.paused=!0,l(c._elem,"pause"))},v={small:{height:240,width:320},medium:{height:360,width:640},large:{height:480,width:853},hd720:{height:720,width:1280},hd1080:{height:1080,width:1920},highres:{height:1080,width:1920}},w=function(b,c,d,e){g.done(function(){var f=function(){var c,e;d._metadata&&d._ytAPI.getVideoLoadedFraction&&(e=d._ytAPI.getVideoLoadedFraction(),c=e*d.duration,d._buffered!==c&&(d._buffered=c,d.buffered.length=1,a(b).trigger("progress")),e>.99&&(d.networkState=1),d.readyState<4&&d.currentTime&&(d._buffered-d.currentTime>9||e>.9)&&(d.readyState=4,l(d._elem,"canplaythrough")))},g=function(){if(d._ytAPI&&d._ytAPI.getCurrentTime){var c=d._ytAPI.getCurrentTime();d.currentTime!=c&&(d.currentTime=c,a(b).trigger("timeupdate")),f()}},h=function(){if("third"==d.isActive&&d._ytAPI&&d._ytAPI.getVolume){var c,e=d._ytAPI.getVolume()/100,h=d._ytAPI.isMuted();e!=d.volume&&(d.volume=e,c=!0),h!=d.muted&&(d.muted=h,c=!0),g(),f(),c&&a(b).trigger("volumechange")}},i=function(){clearInterval(d._timeInterval),d._timeInterval=setInterval(function(){var c=d._ytAPI.getCurrentTime();d.currentTime!=c&&(d.currentTime=c,a(b).trigger("timeupdate"))},350)};d._metatrys=0,d._ytAPI=new YT.Player(c,{height:"100%",width:"100%",allowfullscreen:"allowfullscreen",webkitallowfullscreen:"allowfullscreen",playerVars:{allowfullscreen:!0,fs:1,rel:0,showinfo:0,autohide:1,controls:a.prop(b,"controls")?1:0},videoId:e.videoId,events:{onReady:function(){s(d),setTimeout(h,9),setInterval(h,5e3)},onStateChange:function(c){if(c.target.getDuration){var f;if(!d._metadata){e.suggestedQuality&&d._ytAPI.setPlaybackQuality(e.suggestedQuality);var g=c.target.getDuration(),j=c.target.getPlaybackQuality();g&&(d._metadata=!0,d.duration=g,d.readyState<1&&(d.readyState=1),d.networkState<1&&(d.networkState=2),f=!0,v[j]||(j="medium"),d.videoHeight=v[j].height,d.videoWidth=v[j].width),g&&d._metatrys<3&&("unknown"==j||e.suggestedQuality&&j!=e.suggestedQuality)?(d._metatrys++,d._metadata=!1,f=!1):d._metatrys=0}f&&a(b).trigger("durationchange").trigger("loadedmetadata"),setTimeout(h,9),1==c.data?(u("playing",d),i()):2==c.data?(clearInterval(d._timeInterval),u("pause",d)):3==c.data?(d.readyState>2&&(d.readyState=2),d.networkState=2,a(b).trigger("waiting")):0===c.data&&(d.readyState>4&&(d.readyState=4),d.networkState=1,clearInterval(d._timeInterval),a(b).trigger("ended"))}}}}),a(b).on("updateytdata",h)})};if("matchMedia"in c){var x=!1;try{x=c.matchMedia("only all").matches}catch(y){}x&&(f.sortMedia=function(a,b){return a=!a.media||matchMedia(a.media).matches,b=!b.media||matchMedia(b.media).matches,a==b?0:a?-1:1})}f.createSWF=function(c,d,e){e||(e=b.data(c,"mediaelement"));var h="yt-"+b.getID(c),i=r(d.src),j=a.prop(c,"controls"),n={};if(((n.height=a.attr(c,"height")||"")||(n.width=a.attr(c,"width")||""))&&(a(c).css(n),b.warn("width or height content attributes used. Webshims prefers the usage of CSS (computed styles or inline styles) to detect size of a video/audio. It's really more powerfull.")),e)return f.setActive(c,"third",e),e.currentSrc="",m(e),e.currentSrc=d.srcProp,j!=e._hasControls?(e.shadowElem.html('<div id="'+h+'">'),w(c,h,e,i)):g.done(function(){e._ytAPI.cueVideoById&&e._ytAPI.cueVideoById(i)}),e._hasControls=j,void l(e._elem,"loadstart");var p=a('<div class="polyfill-video polyfill-mediaelement '+b.shadowClass+'" id="wrapper-'+h+'"><div id="'+h+'"></div>').css({position:"relative",overflow:"hidden"}),q=function(){o(e)};e=b.data(c,"mediaelement",b.objectCreate(k,{shadowElem:{value:p},_elem:{value:c},_hasControls:{value:j},currentSrc:{value:d.srcProp},buffered:{value:{start:function(a){return a>=e.buffered.length?void b.error("buffered index size error"):0},end:function(a){return a>=e.buffered.length?void b.error("buffered index size error"):e._buffered},length:0}}})),b.addShadowDom(c,p),f.setActive(c,"third",e),t(c),p.insertBefore(c),o(e),w(c,h,e,i),a(c).on("updatemediaelementdimensions loadedmetadata emptied",q).onWSOff("updateshadowdom",q),l(e._elem,"loadstart")},function(){var c,d=function(b){clearTimeout(b.updateDataTimer),b.updateDataTimer=setTimeout(function(){a(b._elem).triggerHandler("updateytdata")},9)},e={},f=function(a){e[a]={get:function(){var b=p(this);return b?b[a]:c[a].prop._supget.apply(this)},writeable:!1}},g=function(a,b){f(a),delete e[a].writeable,e[a].set=b};i.forEach(f),g("currentTime",function(a){var b=p(this);return b?(a*=1,void(!isNaN(a)&&b._ytAPI&&b._ytAPI.seekTo&&(b._ytAPI.seekTo(a),d(b)))):c.currentTime.prop._supset.apply(this,arguments)}),g("muted",function(a){var b=p(this);return b?void(b._ytAPI&&b._ytAPI.mute&&(b._ytAPI[a?"mute":"unMute"](),d(b))):c.muted.prop._supset.apply(this,arguments)}),g("volume",function(a){var e=p(this);return e?(a*=100,void(!isNaN(a)&&e._ytAPI&&e._ytAPI.setVolume&&((0>a||a>100)&&b.error("volume greater or less than allowed "+a/100),e._ytAPI.setVolume(a),d(e)))):c.volume.prop._supset.apply(this,arguments)}),a.each(["play","pause"],function(a,b){var d=b+"Video";e[b]={value:function(){var a=p(this);return a?void(a._ytAPI&&a._ytAPI[d]&&(a._ytAPI[d](),u(b,a))):c[b].prop._supvalue.apply(this,arguments)}}}),c=b.defineNodeNameProperties("video",e,"prop"),b.onNodeNamesPropertyModify("video","controls",function(b,c){var d=p(this);a(this)[c?"addClass":"removeClass"]("webshims-controls"),d&&d._ytAPI&&!d.readyState&&a(this).mediaLoad()})}()});