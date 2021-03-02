document.addEventListener('DOMContentLoaded', function () {
chrome.storage.sync.get("favoriteColor", function (obj) {
    console.log(obj);
    var favoriteColor = obj.favoriteColor;
        function yourFunction(){
    // do whatever you like here
    //var theme = document.getElementById("theme").selectedIndex;
    //var stheme = document.getElementById("theme").options.selectedIndex = theme;
    //console.log(stheme);
    if(favoriteColor == "flat"){
    	document.body.style.backgroundImage = "url('/flat/bg" + Math.floor(Math.random() * 7 + 1) + ".jpg')";
    };
    if(favoriteColor == "nature"){
    	document.body.style.backgroundImage = "url('/nature/bg" + Math.floor(Math.random() * 7 + 1) + ".jpg')";
    };
    if(favoriteColor == "dino"){
    	document.body.style.backgroundImage = "url('/dino/bg" + Math.floor(Math.random() * 7 + 1) + ".jpg')";
    };
    setTimeout(yourFunction, 50000);
}
yourFunction();
});
document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});


    var Clock = (function () {
        var exports = function (element) {
            this._element = element;
            var html = '';
            for (var i = 0; i < 6; i++) {
                html += '<span>&nbsp;</span>';
            }
            this._element.innerHTML = html;
            this._slots = this._element.getElementsByTagName('span');
            this._tick();
        };

        exports.prototype = {
            _tick: function () {
                var time = new Date();
                this._update(
                    this._pad(time.getHours()) +
                        this._pad(time.getMinutes()) +
                        this._pad(time.getSeconds())
                );
                var self = this;
                setTimeout(function () {
                    self._tick();
                }, 1000);
            },

            _pad: function (value) {
                return ('0' + value).slice(-2);
            },

            _update: function (timeString) {
                var i = 0,
                    l = this._slots.length,
                    value,
                    slot,
                    now;
                for (; i < l; i++) {
                    value = timeString.charAt(i);
                    slot = this._slots[i];
                    now = slot.dataset.now;
                    if (!now) {
                        slot.dataset.now = value;
                        slot.dataset.old = value;
                        continue;
                    }
                    if (now !== value) {
                        this._flip(slot, value);
                    }
                }
            },

            _flip: function (slot, value) {
                slot.classList.remove('flip');
                slot.dataset.old = slot.dataset.now;
                slot.dataset.now = value;
                slot.offsetLeft;
                slot.classList.add('flip');
            },
        };
        return exports;
    })();

    var i = 0,
        clocks = document.querySelectorAll('.clock'),
        l = clocks.length;
    for (; i < l; i++) {
        new Clock(clocks[i]);
    }

    const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    const date = new Date();
    const currHour = date.getHours();
    const currDay = date.getDay();
    const day = DAYS[currDay];
    const month = date.getMonth() + 1;
    const numDate = date.getDate();

    let timeframe;

    if (currHour >= 6 && currHour <= 11) {
        timeframe = 'morning';
    } else if (currHour >= 12 && currHour <= 16) {
        timeframe = 'afternoon';
    } else if (currHour >= 17 && currHour <= 20) {
        timeframe = 'evening';
    } else {
        timeframe = 'night';
    }

    document.querySelector('#day').innerHTML = day;
    document.querySelector('#month').innerHTML = month;
    document.querySelector('#num-date').innerHTML = numDate;
    document.querySelector('#timeframe').innerHTML = timeframe;
});
chrome.runtime.onInstalled.addListener(() => {
	
});
