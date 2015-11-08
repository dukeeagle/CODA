$.fn.draggable = function(){
    var $this = this,
    ns = 'draggable_'+(Math.random()+'').replace('.',''),
    mm = 'mousemove.'+ns,
    mu = 'mouseup.'+ns,
    $w = $(window),
    isFixed = ($this.css('position') === 'fixed'),
    adjX = 0, adjY = 0;

    $this.mousedown(function(ev){
        var pos = $this.offset();
        if (isFixed) {
            adjX = $w.scrollLeft(); adjY = $w.scrollTop();
        }
        var ox = (ev.pageX - pos.left), oy = (ev.pageY - pos.top);
        $this.data(ns,{ x : ox, y: oy });
        $w.on(mm, function(ev){
            ev.preventDefault();
            ev.stopPropagation();
            if (isFixed) {
                adjX = $w.scrollLeft(); adjY = $w.scrollTop();
            }
            var offset = $this.data(ns);
            $this.css({left: ev.pageX - adjX - offset.x, top: ev.pageY - adjY - offset.y});
        });
        $w.on(mu, function(){
            $w.off(mm + ' ' + mu).removeData(ns);
        });
    });

    return this;
};

$("#draggable").draggable();