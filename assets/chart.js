/**
 * RocketBidder - Multi-Timeframe Chart & Interactive Crosshair (RFC-0014)
 * Scoped per .chart-panel for seamless multi-market support (EU + US).
 * Zero-dependency, pure Vanilla JS (< 2.5 KB).
 */
(function() {
  function initChartPanel(panel) {
    var btn15 = panel.querySelector('.btn-tf-15m') || panel.querySelector('#btn-tf-15m');
    var btn1m = panel.querySelector('.btn-tf-1m') || panel.querySelector('#btn-tf-1m');
    var vp15 = panel.querySelector('.chart-viewport-15m') || panel.querySelector('#chart-viewport-15m');
    var vp1m = panel.querySelector('.chart-viewport-1m') || panel.querySelector('#chart-viewport-1m');
    var leg15 = panel.querySelector('.chart-legend-15m') || panel.querySelector('#chart-legend-15m');
    var leg1m = panel.querySelector('.chart-legend-1m') || panel.querySelector('#chart-legend-1m');
    var sub15 = panel.querySelector('.chart-subtitle-15m') || panel.querySelector('#chart-subtitle-15m');
    var sub1m = panel.querySelector('.chart-subtitle-1m') || panel.querySelector('#chart-subtitle-1m');
    var tt = panel.querySelector('.chart-hover-tooltip') || panel.querySelector('#chart-hover-tooltip');
    var ch = panel.querySelector('.chart-crosshair-line') || panel.querySelector('#chart-crosshair-line');

    function hideTt() {
      if (tt) tt.style.display = 'none';
      if (ch) ch.style.display = 'none';
    }

    function switchTf(tf) {
      hideTt();
      if (tf === '1m') {
        if (btn15) { btn15.classList.remove('active'); btn15.style.background = 'transparent'; btn15.style.color = '#94a3b8'; btn15.style.fontWeight = '600'; }
        if (btn1m) { btn1m.classList.add('active'); btn1m.style.background = '#38bdf8'; btn1m.style.color = '#070b14'; btn1m.style.fontWeight = '700'; }
        if (vp15) vp15.style.display = 'none';
        if (vp1m) vp1m.style.display = 'block';
        if (leg15) leg15.style.display = 'none';
        if (leg1m) leg1m.style.display = 'flex';
        if (sub15) sub15.style.display = 'none';
        if (sub1m) sub1m.style.display = 'flex';
      } else {
        if (btn1m) { btn1m.classList.remove('active'); btn1m.style.background = 'transparent'; btn1m.style.color = '#94a3b8'; btn1m.style.fontWeight = '600'; }
        if (btn15) { btn15.classList.add('active'); btn15.style.background = '#38bdf8'; btn15.style.color = '#070b14'; btn15.style.fontWeight = '700'; }
        if (vp1m) vp1m.style.display = 'none';
        if (vp15) vp15.style.display = 'block';
        if (leg1m) leg1m.style.display = 'none';
        if (leg15) leg15.style.display = 'flex';
        if (sub15) sub15.style.display = 'none';
        if (sub15) sub15.style.display = 'flex';
      }
    }

    if (btn15) btn15.addEventListener('click', function() { switchTf('15m'); });
    if (btn1m) btn1m.addEventListener('click', function() { switchTf('1m'); });

    function setupVp(vp, isDaily) {
      if (!vp) return;
      var bars = vp.querySelectorAll('.chart-hover-bar');
      bars.forEach(function(el) {
        el.addEventListener('mouseenter', function() { showTt(el, vp, isDaily); });
        el.addEventListener('touchstart', function() { showTt(el, vp, isDaily); }, {passive: true});
      });
      vp.addEventListener('mouseleave', hideTt);
    }

    function showTt(el, vp, isDaily) {
      if (!tt || !ch) return;
      var cx = parseFloat(el.getAttribute('data-cx'));
      var cy = parseFloat(el.getAttribute('data-cy'));
      var curr = el.getAttribute('data-curr') || '€';
      var svg = vp.querySelector('svg');
      if (!svg) return;
      var rect = svg.getBoundingClientRect();
      var scaleX = rect.width / 1000.0;
      var scaleY = rect.height / 320.0;

      var pixelX = cx * scaleX;
      var pixelY = cy * scaleY;

      ch.style.left = pixelX + 'px';
      ch.style.top = (26 * scaleY) + 'px';
      ch.style.height = (224 * scaleY) + 'px';
      ch.style.display = 'block';

      if (isDaily) {
        var d = el.getAttribute('data-date') || '';
        var o = el.getAttribute('data-open') || '';
        var h = el.getAttribute('data-high') || '';
        var l = el.getAttribute('data-low') || '';
        var c = el.getAttribute('data-close') || '';
        var v = el.getAttribute('data-vol') || '0';
        var sma = el.getAttribute('data-sma20') || '-';
        tt.innerHTML = '<div style="font-weight:700; border-bottom:1px solid #334155; padding-bottom:4px; margin-bottom:6px; color:#38bdf8;" class="mono">📅 ' + d + '</div>' +
          '<div style="display:flex; justify-content:space-between; gap:8px; margin-bottom:3px;" class="mono"><span>Open/Slot:</span> <strong>' + curr + o + ' / ' + curr + c + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between; gap:8px; margin-bottom:3px;" class="mono"><span>Hoog/Laag:</span> <span>' + curr + h + ' / ' + curr + l + '</span></div>' +
          '<div style="display:flex; justify-content:space-between; gap:8px; margin-bottom:3px;" class="mono"><span>SMA-20:</span> <span style="color:#06b6d4;">' + (sma !== '-' ? curr + sma : '-') + '</span></div>' +
          '<div style="display:flex; justify-content:space-between; gap:8px;" class="mono"><span>Volume:</span> <span>' + Number(v).toLocaleString('nl-NL') + '</span></div>';
      } else {
        var t = el.getAttribute('data-time') || '';
        var c = el.getAttribute('data-close') || '';
        var vwap = el.getAttribute('data-vwap') || '';
        var pnl = el.getAttribute('data-pnl') || '';
        var vol = el.getAttribute('data-vol') || '0';
        var pnlColor = parseFloat(pnl) >= 0 ? '#10b981' : '#f43f5e';
        tt.innerHTML = '<div style="font-weight:700; border-bottom:1px solid #334155; padding-bottom:4px; margin-bottom:6px; color:#38bdf8;" class="mono">⏱️ ' + t + ' CET</div>' +
          '<div style="display:flex; justify-content:space-between; gap:8px; margin-bottom:3px;" class="mono"><span>Koers:</span> <strong>' + curr + c + '</strong> <span style="color:' + pnlColor + ';">(' + pnl + '%)</span></div>' +
          '<div style="display:flex; justify-content:space-between; gap:8px; margin-bottom:3px;" class="mono"><span>VWAP:</span> <span style="color:#c084fc;">' + curr + vwap + '</span></div>' +
          '<div style="display:flex; justify-content:space-between; gap:8px;" class="mono"><span>Volume:</span> <span>' + Number(vol).toLocaleString('nl-NL') + '</span></div>';
      }

      tt.style.display = 'block';
      var ttW = tt.offsetWidth || 180;
      var posX = pixelX + 15;
      if (posX + ttW > rect.width) {
        posX = pixelX - ttW - 15;
      }
      tt.style.left = Math.max(10, posX) + 'px';
      tt.style.top = Math.max(10, pixelY - 20) + 'px';
    }

    setupVp(vp15, false);
    setupVp(vp1m, true);
  }

  var panels = document.querySelectorAll('.chart-panel');
  if (panels.length > 0) {
    panels.forEach(initChartPanel);
  }
})();
