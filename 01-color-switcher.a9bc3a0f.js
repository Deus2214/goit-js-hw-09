!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");t.addEventListener("click",(function(t){r=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.currentTarget.disabled=!0,e.removeAttribute("disabled")})),e.addEventListener("click",(function(e){clearInterval(r),e.currentTarget.disabled=!0,t.removeAttribute("disabled")})),e.disabled=!0;var r=null}();
//# sourceMappingURL=01-color-switcher.a9bc3a0f.js.map