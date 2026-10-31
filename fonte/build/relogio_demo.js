/* DaisyCare · relógio de demonstração
   As falas gravadas citam a consulta de cardiologia de 26/10/2026 às 21h.
   Para a demo continuar coerente em qualquer dia, o app começa em
   26/10/2026 às 18h35 (cerca de 2h25 antes da consulta) e o relógio anda
   normalmente a partir daí. Use ?relogio=real na URL para o relógio real. */
(function () {
  try {
    if (/[?&]relogio=real\b/.test(location.search)) return;
  } catch (e) { /* sem location: segue com o relógio de demonstração */ }
  var Real = Date;
  var INICIO_DEMO = '2026-10-26T18:35:00-03:00';
  var desvio = new Real(INICIO_DEMO).getTime() - Real.now();
  function agora() { return Real.now() + desvio; }
  function DataDemo() {
    var args = Array.prototype.slice.call(arguments);
    if (!new.target) return new Real(agora()).toString();
    return Reflect.construct(Real, args.length ? args : [agora()], new.target);
  }
  DataDemo.prototype = Real.prototype;
  DataDemo.now = agora;
  DataDemo.parse = Real.parse;
  DataDemo.UTC = Real.UTC;
  Object.setPrototypeOf(DataDemo, Real);
  window.Date = DataDemo;
  window.DAISY_RELOGIO_DEMO = { inicio: INICIO_DEMO, desvio_ms: desvio };
})();
